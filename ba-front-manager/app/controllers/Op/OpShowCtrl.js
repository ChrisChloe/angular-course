/**
 * OpShowCtrl
 */
angular
    .module('managerApp')
    .controller('OpShowCtrl', ['$scope', '$state', '$location', '$window', 'appConfig', 'Company', 'Op', 'userUtils', 'toastr', '$uibModal', 'Emission', 'OpInspection', 'FinancialReceipts',
        function ($scope, $state, $location, $window, appConfig, Company, Op, userUtils, toastr, $uibModal, Emission, OpInspection, FinancialReceipts) {

            var opId = $state.params.id;
            $scope.op = null;
            $scope.transactionCode = null;

            $scope.companyInspections = [];
            $scope.serviceInspections = [];

            $scope.passengersToEmit = [];
            $scope.hasValidsAttachments = false;

            var companies = [];


            var init = function () {
                load();

                Company.query({}, function (data) {
                    companies = data.data;
                });

                loadInspections();

                $scope.emissionTypes = appConfig.emissionTypes;
            };

            var loadInspections = function () {
                OpInspection.query({ op_id: opId, type: 0 },
                    function (response) {
                        $scope.companyInspections = response.data;
                    });
                OpInspection.query({ op_id: opId, type: 1 },
                    function (response) {
                        $scope.serviceInspections = response.data.filter(function (res) { return res.status !== 0 });
                    });
            }

            var load = function () {
                Op.get({ id: opId }, function (data) {

                    if (data.data.emitter_id || userUtils.isManager() || userUtils.isFinancial()) {
                        // if(data.data.score_id){
                        //     getTransactionCode();
                        // }
                        $scope.op = data.data;
                        // console.log()
                    } else {
                        $location.path("/op");
                    }

                    var obj = $scope.op.attachments;
                    for (var key in obj) {
                        if (obj[key].is_valid == 1) {
                            $scope.hasValidsAttachments = true;
                        }
                    }
                });
            };

            var getCompany = function (id) {
                return companies.find(function (company) {
                    return company.id == id;
                });
            };

            $scope.canDisableFlightPassenger = function (passenger) {
                //console.log(passenger.last_emission_request_to_flight, passenger.last_emission_request_to_flight && passenger.last_emission_request_to_flight.status);
                //console.log(passenger.last_emission_request_to_flight && passenger.last_emission_request_to_flight.status);

                if (!passenger.last_emission_request_to_flight) {
                    return false;
                }

                if (passenger.last_emission_request_to_flight &&
                    (passenger.last_emission_request_to_flight.status == 1 || passenger.last_emission_request_to_flight.status == 2)) {
                    return true;
                }

                return false;
            };

            $scope.canDisableFlightBackPassenger = function (passenger) {
                if (!passenger.last_emission_request_to_flight_back) {
                    return false;
                }

                if (passenger.last_emission_request_to_flight_back &&
                    (passenger.last_emission_request_to_flight_back.status == 1 || passenger.last_emission_request_to_flight_back.status == 2)) {
                    return true;
                }

                return false;
            };

            $scope.checkPassengerToEmit = function (passenger, checked) {
                $scope.passengersToEmit = [];

                var filter = function (passenger) {
                    return passenger.flight_selected_to_emit || passenger.flight_back_selected_to_emit;
                };

                $scope.passengersToEmit = $scope.passengersToEmit.concat($scope.op.passengers.adults.filter(filter));

                if ($scope.op.passengers.children) {
                    $scope.passengersToEmit = $scope.passengersToEmit.concat($scope.op.passengers.children.filter(filter));
                }

                if ($scope.op.passengers.babies) {
                    $scope.passengersToEmit = $scope.passengersToEmit.concat($scope.op.passengers.babies.filter(filter));
                }

            };

            $scope.requestEmit = function (passengers) {
                
                var hasOnePassengerAdult = false;
                var hasOnePassengerDeparture = false;
                var hasOnePassengerReturn = false;

                var validationError = false;
                var validationErrorMessage = '';

                if (!passengers || !passengers.length) {
                    return toastr.error('Selecione ao menos um passageiro!');
                }


                var company = getCompany($scope.op.flight.company.id);
                if($scope.op.flight_back){
                    var company_back = getCompany($scope.op.flight_back.company.id)
                };

                var diffCompanies = $scope.op.flight_back && $scope.op.flight.company.id != $scope.op.flight_back.company.id;

                if (passengers[0].flight_selected_to_emit && passengers[0].flight_back_selected_to_emit && 
                    ($scope.op.flight.fare_type !== $scope.op.flight_back.fare_type)) return toastr.warning('Tipo de Emissão das Passagens não podem ser diferente (Tarifa e Milha)');;

                passengers.forEach(function (p) {

                    if (p.type == 'adult') {
                        hasOnePassengerAdult = true;
                    }

                    if (p.flight_selected_to_emit) {
                        hasOnePassengerDeparture = true;
                    }

                    if (p.flight_back_selected_to_emit) {
                        hasOnePassengerReturn = true;
                    }

                    if ($scope.op.flight.fare_type == 0 && p.flight_selected_to_emit && !company.auto_emission_miles) {                        
                        validationError = true;
                        validationErrorMessage = 'Emissão de voo de milhas indisponível no momento!';
                    }

                    if ($scope.op.flight_back && $scope.op.flight_back.fare_type == 0 && p.flight_back_selected_to_emit && !company_back.auto_emission_miles) {
                        validationError = true;
                        validationErrorMessage = 'Emissão de voo de milhas indisponível no momento!';
                    }

                    if ($scope.op.flight.fare_type == 1 && p.flight_selected_to_emit && !company.auto_emission_money) {
                        validationError = true;
                        validationErrorMessage = 'Emissão de voo de tarifa indisponível no momento!';
                    }

                    if ($scope.op.flight_back && $scope.op.flight_back.fare_type == 1 && p.flight_back_selected_to_emit && !company_back.auto_emission_money) {
                        validationError = true;
                        validationErrorMessage = 'Emissão de voo de tarifa indisponível no momento!';
                    }


                    if ($scope.op.flight_back && p.flight_back_selected_to_emit && p.flight_selected_to_emit && $scope.op.flight.fare_type != $scope.op.flight_back.fare_type) {
                        validationError = true;
                        validationErrorMessage = 'Não é possível emitir voos com milhas e tarifa!';
                    }

                    //if ($scope.op.flight.fare_type == 1 && p.flight_selected_to_emit) {
                    //    validationError = true;
                    //validationErrorMessage = 'Não é possível emitir voo de ida com tarifa!';
                    //}


                    if (p.type == 'baby' && p.flight_selected_to_emit.company.id == 1) {//Avianca
                        validationError = true;
                        validationErrorMessage = 'Emissão inválida: bebês não são permitidos';
                    }

                    if ((p.flight_selected_to_emit && p.flight_back_selected_to_emit && diffCompanies) ||
                        (p.flight_selected_to_emit && p.flight_back_selected_to_emit && diffCompanies)) {
                        validationError = true;
                        validationErrorMessage = 'Emissão inválida: companhias diferentes'
                    }

                    if ((!p.flight_selected_to_emit && p.flight_back_selected_to_emit && hasOnePassengerDeparture) ||
                        (p.flight_selected_to_emit && !p.flight_back_selected_to_emit && hasOnePassengerReturn)) {
                        validationError = true;
                        validationErrorMessage = 'Emissão inválida para ' + p.fullname;
                    }
                });

                if (validationError) return toastr.warning(validationErrorMessage);

                if (!hasOnePassengerAdult) {
                    return toastr.error('Emissão inválida: não possui adultos');
                }

                
                var flightDeparture = $scope.op.flight;
                var flightReturn = $scope.op.flight_back;


                //Show modal
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/emission-request/form.html',
                    controller: 'EmissionRequestCreateCtrl',
                    size: 'md',
                    resolve: {
                        passengers: function () {
                            return passengers;
                        },
                        flight: function () {
                            return flightDeparture;
                        },
                        flight_back: function () {
                            return flightReturn;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });

            };

            $scope.canEmmit = function (passenger, type) {
                if (!passenger.emissions || (passenger.emissions && passenger.emissions.length <= 0)) {
                    return true;
                }

                return !passenger.emissions.some(function (emission) {

                    if (type == appConfig.emissionTypes.oneWayTrip) {
                        return emission.type_trip == appConfig.emissionTypes.oneWayTrip || emission.type_trip == appConfig.emissionTypes.roundTrip;
                    } else if (type == appConfig.emissionTypes.backTrip) {
                        return emission.type_trip == appConfig.emissionTypes.backTrip || emission.type_trip == appConfig.emissionTypes.roundTrip;
                    } else if (type == appConfig.emissionTypes.roundTrip) {
                        return (emission.type_trip == appConfig.emissionTypes.oneWayTrip || emission.type_trip == appConfig.emissionTypes.backTrip || emission.type_trip == appConfig.emissionTypes.roundTrip);
                    }

                });
            };

            var getPassengerMiles = function (passengerType, flight) {
                var miles = 0;

                switch (passengerType) {
                    case 'child':
                        miles = flight.child_miles;
                        break;
                    //case 'adult':
                    default:
                        miles = flight.adult_miles;
                }

                return parseInt(miles);
            };

            var sumMiles = function (passenger, emissionType) {
                var miles = 0;

                if (emissionType == appConfig.emissionTypes.oneWayTrip) {
                    miles += getPassengerMiles(passenger.type, $scope.op.flight);
                } else if (emissionType == appConfig.emissionTypes.backTrip) {
                    miles += getPassengerMiles(passenger.type, $scope.op.flight_back);
                } else {
                    miles += getPassengerMiles(passenger.type, $scope.op.flight);
                    miles += getPassengerMiles(passenger.type, $scope.op.flight_back);
                }

                return miles;
            };

            var getShippingRate = function (emissionType) {
                var rate = 0.0;

                if (emissionType == appConfig.emissionTypes.oneWayTrip) {
                    rate += parseFloat($scope.op.flight.shipping_rate);
                    rate += parseFloat($scope.op.flight.company.additional_tax);
                } else if (emissionType == appConfig.emissionTypes.backTrip) {
                    rate += parseFloat($scope.op.flight_back ? $scope.op.flight_back.shipping_rate : 0);
                    rate += parseFloat($scope.op.flight_back.company.additional_tax);
                } else {
                    rate += parseFloat($scope.op.flight.shipping_rate);
                    rate += parseFloat($scope.op.flight.company.additional_tax);
                    rate += parseFloat($scope.op.flight_back ? $scope.op.flight_back.shipping_rate : 0);
                    rate += parseFloat($scope.op.flight_back.company.additional_tax);
                }

                return rate;
            };

            $scope.emit = function (passenger, type, company) {

                var shipping = getShippingRate(type);
                var miles = sumMiles(passenger, type);

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/emission/form.html',
                    controller: 'EmissionCreateCtrl',
                    size: 'md',
                    resolve: {
                        passenger: passenger,
                        type: type,
                        company: company,
                        shipping: shipping,
                        miles: miles
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });

            };

            $scope.sendTicket = function (emission, user) {
                //emission.sending = true;

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/op/ticket-send.html',
                    controller: 'TicketSendCtrl',
                    size: 'md',
                    resolve: {
                        emission: emission,
                        user: user,
                        load: { func: load }
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });
            };

            $scope.sendTicketDirect = function (emission, user, type) {
                type = type || 0;

                emission.sending = true;

                Emission.sendTicket({id: emission.id}, {to: user.email, cc: [], bcc: [], type: type},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Bilhete enviado!");
                        }
                        emission.sending = false;
                        load();
                    });
            };

            //Emissão finalizada
            $scope.emitted = function (op) {

                Op.update({ id: op.id }, { status: 6 },
                    function success(data) {
                        if (!data.error) {
                            op.status_title = data.data.status_title;
                            op.emitted_at = data.data.emitted_at;
                            op.can_emmit = false;
                            toastr.success("Emitida!");
                        }
                    });
            };

            $scope.captureBraspag = function (op) {

                Op.capturePayment({ id: op.id },
                    function success(data) {
                        if (!data.errors) {
                            toastr.success("Solicitado!");
                            location.reload();
                        } else {
                            toastr.error("Não disponivel para captura");
                        }
                    });
            };

            $scope.infomationDetails = function (op) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/op/information.html',
                    controller: 'OpInformationCtrl',
                    size: 'md',
                    resolve: {
                        op: op
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });
            };

            $scope.verify = function () {
                $scope.sending = true;

                OpInspection.verify({ id: opId }, {},
                    function success(data) {
                        $scope.sending = false;
                        load();

                        if (!data.error) {
                            toastr.success("Verificação concluída!");
                            loadInspections();
                        } else {
                            toastr.error(data.message);
                        }
                    },
                    function error(data) {
                        $scope.sending = false;

                    }
                );
            };


            $scope.verifiedServiceError = null;
            $scope.countingError = 0;

            $scope.verifyService = function () {
                $scope.sendingService = true;
                var services = ['skyteam', 'maisfly'];

                services.forEach(function (service) {

                    OpInspection.verifyByService({ id: opId }, { service: service },
                        function success(res) {

                            if(res.error) $scope.sendingService = false;

                            var data = res.data;
                            
                            if (data.status != 0) {
                                
                                toastr.success("Verificação concluída na Consolidadora "+ service.toUpperCase());
                                loadInspections();

                            } else {

                                toastr.warning("Erro na verificação mais recente da consolidadora " + service.toUpperCase());
                                $scope.countingError += 1;
                                if($scope.countingError == services.length) $scope.verifiedServiceError = "Erro na Verificação mais Recente";

                            }
                            
                            $scope.sendingService = false;
                        },
                        function error(data) {
                            toastr.error("Ocorreu um erro");
                            $scope.countingError += 1;
                            if($scope.countingError == services.length) $scope.sendingService = false;         
                        }
                    );
                    
                });




            }
            // /**
            //  * Pega Codigo da transação
            //  */
            // $scope.getTransactionCode = function(){
            //     FinancialReceipts.getTransactionCode({}, {resource: 'api.receipts.getTransactionCode', reference : $scope.op.invoice_id },
            //         function success(data) {
            //             $scope.transactionCode = data.data;
            //         });
            // };

            $scope.downloadFile = function (filename) {
                $scope.btnId = '#' + filename.slice(0, 12);
                $scope.$emit('download-start');

                setTimeout(function () {
                    Op.downloadFileTransfer({ id: $scope.op.id, filename: filename }, {},
                        function success(response) {
                            if (response.data.error) return response;
                            $scope.$emit('download-end');

                            var file = new Blob([response.data], { type: response.content_type });
                            var url = (window.URL || window.webkitURL).createObjectURL(file);
                            $window.open(url);

                        }, function error(err) {
                            $scope.$emit('download-end');
                            toastr.error('Não foi possível baixar!' + err.message);
                        });
                }, 1000);

            };

            $scope.$on('download-start', function () {
                $($scope.btnId).prop('ng-disabled', true);
                $($scope.btnId).attr('disabled', 'disabled');
                var fa = $($scope.btnId).children("i");
                fa.attr('class', 'fa fa-spinner fa-spin');
            });

            $scope.$on('download-end', function () {
                $($scope.btnId).prop('ng-disabled', false);
                $($scope.btnId).removeAttr('disabled');
                var fa = $($scope.btnId).children("i");
                fa.attr('class', 'fa fa-download');
            });

            $scope.hasPassport = function (passengers) {
                console.log(passengers);
                if (!passengers || !passengers.adults.length) return false;

                var hasPassport = function (p) {
                    return p.passport_number || p.passport_expires_at;
                };

                if (passengers.adults.some(hasPassport)) return true;
                if (passengers.childreen && passengers.childreen.some(hasPassport)) return true;
            };

            init();
        }]);

