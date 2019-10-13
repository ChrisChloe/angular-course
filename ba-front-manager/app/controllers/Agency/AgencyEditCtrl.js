/**
 * Agency edit controller
 */
angular
    .module('app.controllers')
    .controller('AgencyEditCtrl', ['$scope', '$rootScope', 'appConfig', 'Coupon', 'Credit', 'Debit', 'Agency', 'Observation', 'Attachment', 'Adjustment', 'Company', 'Group', 'Wallet', '$state', 'toastr', '$uibModal', 'userUtils', 'cepUtils',
        function ($scope, $rootScope, appConfig, Coupon, Credit, Debit, Agency, Observation, Attachment, Adjustment, Company, Group, Wallet, $state, toastr, $uibModal, userUtils, cepUtils) {
            var agencyId = $state.params.id;

            $scope.title = "Editar Agência";
            $scope.agency = null;
            $scope.observations = [];
            $scope.companies = [];
            $scope.groups = [];
            $scope.wallets = [];

            $scope.attachments = [];
            $scope.viewAttachment = false;
            $scope.disableAddInformations = true;
            $scope.coupons = [];
            $scope.coupon = null;
            $scope.adjustments = [];
            $scope.adjustment = null;
            $scope.adjustmentTypes = [];
            $scope.fareTypes = [];
            $scope.calculationTypes = [];
            $scope.applicationTypes = [];
            $scope.flightTypes = [];
            $scope.couponableTypes = [];

            $scope.isExecutive = $rootScope.isExecutive();

            $scope.generateCode = true;
            $scope.generator = true;

            $scope.credits = [];
            $scope.resourceCredit = Credit;
            $scope.filterCriteriaCredit = appConfig.filterCriteria();
            $scope.filterCriteriaCredit.addParam('agency_id', agencyId);

            $scope.debits = [];
            $scope.resourceDebit = Debit;
            $scope.filterCriteriaDebit = appConfig.filterCriteria();
            $scope.filterCriteriaDebit.addParam('agency_id', agencyId);

            $scope.counters = {
                searches_count: 0,
                searches_count_week: 0,
                searches_count_month: 0,
                ops_count: 0,
                ops_count_week: 0,
                ops_count_month: 0,
                payments_count: 0,
                payments_count_week: 0,
                payments_count_month: 0
            };

            $scope.paymentTypes = appConfig.PaymentTypes;
            $scope.isManager = userUtils.isManager;
            $scope.isFinancial = userUtils.isFinancial;

            var init = function () {

                $scope.searchedCpfCnpj = true;
                Agency.get({ id: agencyId }, function (data) {
                    $scope.agency = data.data;
                    $scope.agencyCpfCnpj = $scope.agency.cpf_cnpj;
                    $scope.is_cpf = $scope.agency.cpf_cnpj.length <= 14 ? 0 : 1;
                    $scope.agency.mailer === 1 ? $scope.mailer = true : $scope.mailer = false;

                    if ($scope.agency.contacts) {//@todo:Refatorar
                        for (var i = 0; i < 3; i++) {
                            if (i === 0 || i === 1) {
                                $scope.agency.contacts[i] = {
                                    type: 'phone',
                                    value: $scope.agency.contacts[i] ? $scope.agency.contacts[i].value : null
                                };
                            } else if (i === 2) {
                                $scope.agency.contacts[i] = {
                                    type: 'email',
                                    value: $scope.agency.contacts[i] ? $scope.agency.contacts[i].value : null
                                };
                            }
                        }
                    }
                });



                Observation.query({
                    agency: agencyId,
                    orderBy: 'id',
                    sortedBy: 'desc'
                }, function (data) {
                    $scope.observations = data.data;
                });

                Agency.getAditionalAddress({
                    addressable_id: agencyId,
                    addressable_type: 'agency',
                }, function (data) {
                    $scope.aditionalAddresses = data.data;
                    $scope.aditionalAddresses.forEach(function (address) {
                        address.exists = true;
                    });

                    $scope.addAddress = $scope.aditionalAddresses.length;
                });

                Attachment.query({
                    agency: agencyId,
                    orderBy: 'id',
                    sortedBy: 'desc'
                }, function (data) {
                    $scope.attachments = data.data;
                });

                Company.query({}, function (data) {
                    $scope.companies = data.data;
                });

                Group.query({}, function (data) {
                    $scope.groups = data.data;
                });

                Wallet.query({}, function (data) {
                    $scope.wallets = data.data;
                });

                $scope.adjustment = new Adjustment();
                $scope.coupon = new Coupon();
                $scope.adjustmentTypes = appConfig.adjustmentTypes;
                $scope.fareTypes = appConfig.fareTypes;
                $scope.calculationTypes = appConfig.calculationTypes;
                $scope.applicationTypes = appConfig.applicationTypes;
                $scope.flightTypes = appConfig.flightTypes;
                $scope.status = appConfig.agency_status;
                $scope.region = appConfig.region;
                $scope.couponableTypes = appConfig.couponableTypes;

                listAdjustments();
                listCoupons();
            };

            var listAdjustments = function () {

                Adjustment.query({ search: "agency:" + agencyId }, function (data) {
                    $scope.adjustments = data.data;
                });

            };
            var listCoupons = function () {
                Coupon.query({ agency: agencyId }, function (data) {
                    $scope.coupons = data.data;
                });
            };

            $scope.clearValueField = function () {
                $scope.coupon.value = null;
                $scope.adjustment.value = null;
            };

            $scope.save = function (agency) {
                $scope.mailer === true ? agency.mailer = 1 : agency.mailer = 0;

                Agency.update({ id: agency.id }, agency,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.agency');

                        }
                    });


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

            $scope.consultAditionalCep = function (aditionalAddress) {

                if (aditionalAddress.zip_code) {
                    Agency.cep({ cep: aditionalAddress.zip_code }, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Consulta Efetuada!");
                                aditionalAddress.street = data.street;
                                aditionalAddress.number = data.number;
                                aditionalAddress.district = data.district;
                                aditionalAddress.state = data.uf;
                                aditionalAddress.city = data.city;
                            } else {
                                toastr.error(data.message);
                            }
                        });
                } else {
                    toastr.info('Digite um CEP válido');
                }
            };

            $scope.cancelCredit = function (credit) {
                Agency.cancelCredit({ id: credit.id }, {},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("cancelamento Efetuado!");
                            $scope.credits.splice($scope.credits.indexOf(credit), 1);
                        } else {
                            toastr.warning(data.message);
                        }
                    });

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


                            $scope.searchedCpfCnpj = true;
                            toastr.success("Consulta Efetuada!");
                        }
                    });
            };

            var consultCnpj = function (agency) {
                Agency.cnpj({ cnpj: agency.cpf_cnpj }, {},
                    function success(response) {
                        if (!response.error) {
                            agency.title = response.data.name;
                            agency.phone = response.data.phone;
                            agency.email = response.data.email;

                            if (response.data.address) {
                                agency.addresses.cep = cleanUp(response.data.address.zip_code)
                                agency.addresses.number = response.data.address.number;
                                agency.addresses.street = response.data.address.street;
                                agency.addresses.neighborhood = response.data.address.district;
                                agency.addresses.city = response.data.address.city;
                                agency.addresses.uf = response.data.address.uf;
                            };


                            var statusFound = $scope.status.filter(function (item) {

                                return item.title.toUpperCase() === response.data.status.toUpperCase();
                            });

                            agency.status = statusFound[0].value;

                            agency.responsible = '';
                            response.data.associates.forEach(function (associate) {
                                agency.responsible = associate.nome + " " + agency.responsible;
                            });

                            $scope.searchedCpfCnpj = true;
                            toastr.success("Consulta Efetuada!");
                        }
                    });

            };

            $scope.consult = function (agency) {

                if (!agency || !agency.cpf_cnpj) return;

                var verify = false;
                Agency.verifyIfExists({ cpf_cnpj: agency.cpf_cnpj },
                    function (response) {
                        if (!response.data || $scope.agencyCpfCnpj === agency.cpf_cnpj) {

                            if (agency.cpf_cnpj && agency.cpf_cnpj.length <= 11) {
                                consultCpf(agency);
                            } else {
                                consultCnpj(agency);
                            }

                        } else {
                            toastr.warning("Essa agência já existe.");
                            existingAgencyModal(response.data);

                        }
                    });


            };

            var existingAgencyModal = function (data) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/existing-agency-modal.html',
                    size: 'md',
                    controller: 'ExistingAgencyModalCtrl',
                    resolve: {
                        agency: data

                    }
                });
            }

            $scope.addObservation = function (agency) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/observation/modals/create.html',
                    controller: 'ObservationCreateCtrl',
                    size: 'md',
                    resolve: {
                        agency: agency
                    }
                });

                modalInstance.result.then(function (observation) {
                    $scope.observations.push(observation);
                });
            };


            $scope.limitAdjustmentValue = function (adjustment) {
                if (adjustment.value > 100) {
                    adjustment.value = 100;
                }
            };
            $scope.limitCouponValue = function (coupon) {
                if (coupon.value > 100) {
                    coupon.value = 100;
                }
            };


            $scope.saveAdjustment = function (adjustment) {

                Adjustment.update({ id: adjustment.id }, adjustment,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                        }
                    });
            };

            $scope.addAdjustment = function (adjustment) {
                adjustment.adjustable_type = 'agency';
                adjustment.adjustable_id = agencyId;

                adjustment.$save(
                    function success(data) {
                        if (!data.error) {
                            //$scope.adjustments.push(adjustment);
                            listAdjustments();
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.removeAdjustment = function (adjustment) {
                Adjustment.delete({ id: adjustment.id },
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Removido!");
                            $scope.adjustments.splice($scope.adjustments.indexOf(adjustment), 1);
                        }
                    });

            };

            $scope.addCoupon = function (coupon) {
                coupon.expires_at = moment(coupon.expires_at, 'DD/MM/YYYY').format('YYYY-MM-DD 00:00:00');
                coupon.couponable_type = 'agency';
                coupon.couponable_id = agencyId;
                $scope.generator ? coupon.code = null : coupon.code = coupon.code

                Coupon.save(coupon,
                    function success(data) {
                        if (!data.error) {
                            listCoupons();
                            toastr.success("Salvo!");
                        }

                        coupon.expires_at = '';
                        coupon.type = '';
                        coupon.value = 0;
                        coupon.code = '';
                        $scope.generateCode = true;


                    });


            };

            $scope.clearCodeGenerateField = function () {
                $scope.generator = !$scope.generator;
            };


            $scope.removeCoupon = function (coupon) {
                Coupon.delete({ id: coupon.id },
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Removido!");
                            $scope.coupons.splice($scope.coupons.indexOf(coupon), 1);
                        }

                    });

            };

            $scope.addAttachment = function (agency) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/attachment.html',
                    controller: 'AttachmentCreateCtrl',
                    size: 'md',
                    resolve: {
                        agency: agency
                    }
                });

                modalInstance.result.then(function (attachment) {
                    $scope.attachments.push(attachment);
                });
            };

            $scope.addCredit = function (agency) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/credit.html',
                    controller: 'CreditCreateCtrl',
                    size: 'md',
                    resolve: {
                        agency: agency
                    }
                });

                modalInstance.result.then(function (credit) {
                    $scope.credits.unshift(credit);
                });
            };

            $scope.filter = function (search) {
                $scope.$broadcast('onSearch', search);
            };

            var listDebits = function () {

                Adjustment.query({ search: "agency:" + agencyId }, function (data) {
                    $scope.debits = data.data;
                });
            };

            /**
             * Get and fill dynamically counters
             */
            var getCounters = function () {
                var types = ['searches', 'ops', 'payments'];

                types.forEach(function (type) {
                    Agency.counters({ id: agencyId, type: type }, function (data) {
                        for (var name in data.data) {
                            $scope.counters[type + '_' + name] = data.data[name];
                        }
                    });
                });

            };

            $scope.generateToken = function (agency) {

                Agency.generateToken({ id: agency.id }, {},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Token Gerado com Sucesso!");
                        } else {
                            toastr.warning(data.message);
                        }
                    });
            };

            /**
             *
             */
            $scope.$watch('agency', function (agency) {
                if (agency && agency.addresses && agency.addresses.length) {
                    agency.addresses.forEach(function (address) {
                        if (address.street) {
                            address.street = address.street.replace(/;/g, '');
                        }
                    });
                }
            }, true);






            $scope.saveOrCreateAddress = function (aditionalAddress) {
                aditionalAddress.addressable_id = agencyId;
                aditionalAddress.addressable_type = 'agency';
                aditionalAddress.country = 'Brasil';

                if (aditionalAddress.exists) {
                    updateAditionalAddress(aditionalAddress);
                } else {
                    createAditionalAddress(aditionalAddress);
                }

            }


            var createAditionalAddress = function (aditionalAddress) {

                Agency.createAditionalAddress(aditionalAddress,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Criado!");
                            aditionalAddress.exists = true;
                            aditionalAddress.id = data.data.id;
                            
                        }
                    });

            };

            var updateAditionalAddress = function (aditionalAddress) {

                Agency.updateAditionalAddress({id: aditionalAddress.id}, aditionalAddress,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            aditionalAddress.notSavedChanges = false;
                        };
                    });

            };


            $scope.deleteThisAddress = function (index) {
                if ($scope.aditionalAddresses[index].exists) {

                    Agency.deleteAditionalAddress({id: $scope.aditionalAddresses[index].id},
                        function success() {
                            $scope.aditionalAddresses.splice(index, 1);
                            $scope.addAddress -= 1;

                        });

                } else {

                    $scope.aditionalAddresses.splice(index, 1);
                    $scope.addAddress -= 1;

                };

            };

            $scope.verifyType = function (index, selectedType) {
                $scope.detectChanges($scope.aditionalAddresses[index]);
                var otherIndex = (index == 0 ? 1 : 0);

                if ($scope.aditionalAddresses[otherIndex] && ($scope.aditionalAddresses[otherIndex].type == selectedType)) {
                    $scope.aditionalAddresses[index].type = '';
                    toastr.warning('Não é permitido adicionar dois endereços do mesmo tipo');
                };

            };

            $scope.address_types = appConfig.addressTypes;
            $scope.aditionalAddresses = [];

            $scope.newAddress = function () {
                $scope.aditionalAddresses[$scope.addAddress] = {};
                $scope.addAddress += 1;
            };

            $scope.detectChanges = function (aditionalAddress) {
                if(aditionalAddress.exists){
                    aditionalAddress.notSavedChanges = true;
                }

            }




            getCounters();
            init();
        }]);
