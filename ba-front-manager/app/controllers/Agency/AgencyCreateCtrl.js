/**
 * Agency create controller
 */
angular
    .module('app.controllers')
    .controller('AgencyCreateCtrl', ['$scope', '$rootScope', 'appConfig', '$state', 'Agency', 'Group', 'Wallet', 'toastr', 'cepUtils', '$uibModal',
        function ($scope, $rootScope, appConfig, $state, Agency, Group, Wallet, toastr, cepUtils, $uibModal) {

            $scope.title = "Adicionar Agência";
            $scope.agency = null;
            $scope.disableAddObservations = true;
            $scope.disableAddInformations = true;
            $scope.groups = [];
            $scope.wallets = [];

            $scope.status = appConfig.agency_status;
            $scope.region = appConfig.region;

            $scope.isExecutive = $rootScope.isExecutive();

            $scope.is_cpf = 1;

            var init = function () {
                $scope.agency = new Agency();
                $scope.agency.addresses = {};

                $scope.agency.status = 2;
                $scope.agency.allow_executive = 0;
                if ($scope.isExecutive) {
                    $scope.agency.status = 2;
                }

                $scope.$watch('agency.addresses', function (address) {
                    if (address && address[0] && address[0].street) {
                        address[0].street = address[0].street.replace(/;/g, '');
                    }
                }, true);

                Group.query({}, function (data) {
                    $scope.groups = data.data;
                });

                Wallet.query({}, function (data) {
                    $scope.wallets = data.data;
                });
            };


            $scope.save = function (agency) {
                if (!agency.region) {
                    toastr.warning("Campo Região é Obrigatório");
                } else {
                    agency.$save(
                        function success(data) {
                            if (!data.error && !$scope.isExecutive) {
                                $state.go('app.agency-employee', data.data);
                                toastr.success("Agência criada, adicione os primeiros funcionários!");
                            } else if ($scope.isExecutive) {
                                toastr.success("Agência criada com sucesso");
                            }
                        }
                    );
                }
            };

            $scope.consultCep = function (agency) {

                if (agency.addresses.cep) {
                    Agency.cep({ cep: agency.addresses.cep }, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Consulta Efetuada!");

                                agency.addresses.street = data.street;
                                agency.addresses.neighborhood = data.district;
                                agency.addresses.uf = data.uf;
                                agency.addresses.city = data.city;

                            } else {
                                toastr.error(data.message);
                            }
                        });
                } else {

                    toastr.info('Digite um CEP válido');
                }

            };

            var cleanUp = function (value) {
                value = value.toString();
                return value.replace(/\D/g, '');
            };

            // var mapAddress = function (address) {
            //     return address.map(function () {
            //         return {
            //             cep: cleanUp(response.data.address.zip_code),
            //             number: response.data.address.number,
            //             street: response.data.address.street,
            //             neighborhood: response.data.address.district,
            //             city: response.data.address.city,
            //             uf: response.data.address.uf,
            //             complement: response.data.address.complement
            //         }
            //     });
            // };

            var consultCpf = function (agency) {
                Agency.cpf({ cpf: agency.cpf_cnpj }, {},
                    function success(response) {
                        $scope.searchingCpfCnpj = false;
                        $scope.searchedCpfCnpj = true;
                        if (!response.error) {
                            agency.title = response.data.name;


                            if (response.data.phone) agency.phone = response.data.phone[0];
                            if (response.data.emails) agency.email = response.data.emails[0];

                            if (response.data.addresses[0]) {
                                agency.addresses.cep = cleanUp(response.data.addresses[0].zip_code)
                                agency.addresses.number = response.data.addresses[0].number;
                                agency.addresses.street = response.data.addresses[0].street;
                                agency.addresses.neighborhood = response.data.addresses[0].district;
                                agency.addresses.uf = response.data.addresses[0].uf;
                                agency.addresses.city = response.data.addresses[0].city;
                            };
                            toastr.success("Consulta Efetuada!");
                        }
                    });
            };

            var consultCnpj = function (agency) {
                Agency.cnpj({ cnpj: agency.cpf_cnpj }, {},
                    function success(response) {
                        $scope.searchingCpfCnpj = false;

                        $scope.searchedCpfCnpj = true;

                        if (!response.error) {

                            agency.title = response.data.name;
                            agency.phone = response.data.phone;
                            agency.email = response.data.email;


                            if (response.data.address) {
                                agency.addresses.cep = cleanUp(response.data.address.zip_code)
                                agency.addresses.number = response.data.address.number;
                                agency.addresses.street = response.data.address.street;
                                agency.addresses.neighborhood = response.data.address.district;
                                agency.addresses.uf = response.data.address.uf;
                                agency.addresses.city = response.data.address.city;
                            };

                            // var statusFound = $scope.status.filter(function (item) {
                            //     return item.title.toUpperCase() === response.data.status.toUpperCase();
                            // });

                            // if(statusFound[0]) agency.status = statusFound[0].value;

                            agency.responsible = '';
                            response.data.associates.forEach(function (associate) {
                                agency.responsible = associate.nome + " " + agency.responsible;
                            });
                            toastr.success("Consulta Efetuada!");
                        }
                    },
                    function error(err) {
                        $scope.searchingCpfCnpj = false;
                        $scope.searchedCpfCnpj = true;

                    });

            };

            $scope.consult = function (agency) {

                $scope.searchingCpfCnpj = true;

                if (!agency || !agency.cpf_cnpj) {
                    $scope.searchingCpfCnpj = false;
                    toastr.warning('Preencha o campo de CPF/CNPJ');
                    return;
                }
                
                var verify = false;
                Agency.verifyIfExists({ cpf_cnpj: agency.cpf_cnpj },
                    function (response) {
                        if (!response.data) {
                            if (agency.cpf_cnpj && agency.cpf_cnpj.length <= 11) {
                                consultCpf(agency);
                            } else {
                                consultCnpj(agency);
                            }
                        } else {
                        $scope.searchingCpfCnpj = false;
                            toastr.warning("Essa agência já existe.");
                            existingAgencyModal(response.data);
                        }
                    });


            };

            $scope.setDefaultAddress = function (addresses) { 
                addresses.city = 'Recife';
                addresses.cep = '52010-000';
                addresses.neighborhood = 'Paissandu';
                addresses.uf = 'PE';
                addresses.street = 'Rua do Paissandú';
                addresses.number = 714;
            };

            var existingAgencyModal = function (data) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/existing-agency-modal.html',
                    size: 'sm',
                    controller: 'ExistingAgencyModalCtrl',
                    resolve: {
                        agency: data

                    }
                });
            };

            init();
        }]);
