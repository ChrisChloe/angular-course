/**
 * User create controller
 */
angular
    .module('app.controllers')
    .controller('UserCreateCtrl', ['$scope', '$state', '$cookies', 'User', 'Agency', 'toastr', 'cepUtils',
        function ($scope, $state, $cookies, User, Agency, Role, toastr, cepUtils) {
            $scope.title = "Adicionar Usuário";
            $scope.user  = null;
            $scope.disableAddInformations = true;
            $scope.visibility = false;
            $scope.classButton = 'col-md-6';



            var init = function(){
                $scope.user          = new User();
                $scope.user.status   = 1;
                $scope.user.password = Math.random().toString(36).slice(-8);
                $scope.is_cpf        = 0;

                if($state.params.id){
                    Agency.query({limit: 30, id: $state.params.id, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.user.agency = response.data;
                            $scope.user.address = response.data.addresses;
                        }
                    );
                }
            };

            var validateAgency = function() {
                var result = false;
                if ($scope.user.agency_id) {
                    result = true;
                }
                else {
                    toastr.error("O campo 'Agência' é obrigatório");
                }

                return result;
            };

            var validate = function() {
                return validateAgency();
            };

            $scope.save = function (user) {
                user.agency_id = user.agency.id;
                var agency     = user.agency;
                if (validate()) {
                    user.$save(
                        function success(data) {
                            if (!data.error) {
                                if($state.params.id) {
                                    $state.go('app.agency-employee', agency);
                                } else {
                                    $state.go('app.user');
                                }
                                toastr.success("Salvo!");
                            }
                        }
                    );
                }

            };

          
            // $scope.consultCep = function (address) {

            //     if (cepUtils.validCep(address)) {
            //         Agency.cep({cep: address.cep}, {},
            //             function success(data) {
            //                 if (!data.error) {
            //                     toastr.success("Consulta Efetuada!");
            //                     address.street       = data.street;
            //                     address.neighborhood = data.district;
            //                     address.city         = data.city;
            //                     address.uf           = data.uf;
            //                 } else {
            //                     toastr.error(data.message);
            //                 }
            //             });
            //     };

            // };

            $scope.consultCep = function (user) {

                if (user.address.cep) {
                    Agency.cep({ cep: user.address.cep }, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Consulta Efetuada!");
                                user.address.street = data.street;
                                user.address.neighborhood = data.district;
                                user.address.uf = data.uf;
                                user.address.city = data.city;
                                user.address.number = data.number;
                            } else {
                                toastr.error(data.message);
                            }
                        });
                } else {
                    toastr.info('Digite um CEP válido');
                }

            };

            $scope.searchAgency = function(search){
                if(search && search.length){
                    Agency.query({limit: 30, search: search, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.agencies = response.data;
                        }
                    );
                }
            };

            init();
        }]);
