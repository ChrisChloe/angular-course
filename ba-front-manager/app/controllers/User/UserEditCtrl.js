/**
 * User create controller
 */
angular
    .module('app.controllers')
    .controller('UserEditCtrl', ['$scope', '$rootScope', '$location', '$http', '$window', '$cookies', '$state', '$filter', 'User', 'Agency', 'toastr', 'cepUtils',
        function ($scope, $rootScope, $location, $http , $window, $cookies, $state, $filter, User, Agency, toastr, cepUtils) {
            $scope.title    = "Editar Usuário";

            $scope.user     = {information: null};
            $scope.agencies = [];
            $scope.visibility  = true;
            $scope.classButton = 'col-md-4';
            $scope.btnButton   = "Enviar redefinição de senha";
            $scope.button = false;

            $scope.disableAddInformations = true;
            $scope.showAddAgency = true;

            var defaultAgencies = [];

            var formatDate = function (user) {
                if (user.information && user.information.birthday) {
                    var formated = $filter("date")($filter('toDate')(user.information.birthday), "dd/MM/yyyy");
                    $scope.user.information.birthday = formated;
                }
            };

            var init = function () {

                User.get({id: $state.params.id}, function (data) {
                    $scope.user = data.data;
                    //$scope.address = data.data.addresses;

                    if(!$scope.user.information){
                        $scope.user.information = {};
                    }

                    $scope.user.is_manager = !!$scope.user.is_manager;

                    formatDate($scope.user);

                    if($scope.user && $scope.user.information && $scope.user.information.cpf_cnpj){
                        $scope.is_cpf = $scope.user.information.cpf_cnpj.length <= 14 ? 0 : 1;
                    }else if ($scope.user){
                        $scope.is_cpf = 0;
                    }

                    // if($scope.user.agency_id){
                    //     Agency.get({id:$scope.user.agency_id},
                    //         function success(response) {
                    //             $scope.agencies.push(response.data);
                    //             defaultAgencies.push(response.data);
                    //         }
                    //     );
                    // }
                });

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

            $scope.onSelectAgency = function(agency){
                if(agency){
                    $scope.user.agency_id = agency.id;
                }else{
                    $scope.user.agency_id = null;
                    $scope.user.agency = null;
                }
            };

            $scope.save = function (user) {
                User.update({id: user.id}, user,
                    function success(data) {
                        if (!data.error) {
                            // $rootScope.back();
                            toastr.success("Atualizado!");
                        }
                    });
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
            //     }

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



            /* Envia email para redefinição de senha */
            var controleButtonAtivar = function () {
                $scope.button = false;
                $scope.btnButton = "Enviar redefinição de senha";
            };

            $scope.sendResetEmail = function (user) {
                $scope.button = true;
                $scope.btnButton = 'Processando...';
                User.sendPasswordEmail({}, user,
                    function (data) {
                        controleButtonAtivar();
                        toastr.success('Solicitação enviada!');
                    });

            };

            //$scope.canEditAgency = function(){
            //    var user = $cookies.getObject('auth_user');
            //    user = user.data ? user.data : user;
            //
            //    var isAdmin = user.roles.some(function(item){
            //        return (item.id == 1  || item.id == 2);
            //    });
            //
            //    return !isAdmin;
            //};

            init();
        }]);
