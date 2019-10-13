/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('EmissionRequestCreateCtrl', ['$scope', '$rootScope', 'passengers', 'flight', 'flight_back', 'Company', 'EmissionRequest', 'Card', 'Stock', 'toastr', '$uibModal', '$uibModalInstance', '$interval',
        function ($scope, $rootScope, passengers, flight, flight_back, Company, EmissionRequest, Card, Stock, toastr, $uibModal, $uibModalInstance, $interval) {

            $scope.card = null;
            $scope.cards = [];
            $scope.stocks = [];

            $scope.company = null;

            $scope.flight = flight;
            $scope.flightBack = flight_back;

            $scope.sending = false;
            $scope.showForm = true;
            $scope.success = false;
            $scope.enableCancel = false;

            var TYPE_DEPARTURE = 1;
            var TYPE_RETURN = 2;
            var TYPE_ROUND = 3;

            //Get type
            var type = TYPE_DEPARTURE;

            var init = function () {

                //Get only ids
                var ids = passengers.map(function (p) {
                    return p.id;
                });

                passengers.forEach(function (p) {
                    if (p.flight_selected_to_emit && p.flight_back_selected_to_emit) {
                        type = TYPE_ROUND;
                        $scope.company = $scope.flight.company;
                        return false;
                    } else if (!p.flight_selected_to_emit && p.flight_back_selected_to_emit) {
                        type = TYPE_RETURN;
                        $scope.company = $scope.flightBack.company;
                        return false;
                    } else {
                        type = TYPE_DEPARTURE;
                        $scope.company = $scope.flight.company;
                        return false;
                    }
                });

                $scope.emissionRequest = new EmissionRequest({
                    type: type,
                    observation: null,
                    card_id: null,
                    passengers: ids
                });

            };

            $scope.emissionRequestIsMiles = function () {
                var flight_departure_selected = passengers[0].flight_selected_to_emit;
                var flight_back_selected = passengers[0].flight_back_selected_to_emit;

                if ((flight_departure_selected && flight_back_selected) && flight_back.fare_type === 1 && flight.fare_type == 1) return false;

                if ((flight_departure_selected && !flight_back_selected) && flight.fare_type === 1) return false;

                if ((!flight_departure_selected && flight_back_selected) && flight_back.fare_type === 1) return false;

                return true;

            }

            $scope.getPremiumName = function () {
                var flight_departure_selected = passengers[0].flight_selected_to_emit;
                var flight_back_selected = passengers[0].flight_back_selected_to_emit;
                var title = null;


                if (flight_departure_selected && (flight.company.id === 3 || flight.company.id === 7)) title = 'Diamante';

                else if (flight_back_selected && (flight_back.company.id === 3 || flight_back.company.id === 7)) title = 'Diamante';




                return title;
            };

            $scope.showCompanyName = function () {
                var companyName = $scope.flight.company.title;

                if (passengers[0].flight_back_selected_to_emit) {
                    companyName = $scope.flightBack.company.title;
                }

                if (passengers[0].flight_selected_to_emit) {
                    companyName = $scope.flight.company.title;
                }

                return companyName;

            };

            $scope.listCards = function (search, limit) {
                var oldCards = $scope.cards;

                $rootScope.$emit("showLoadingScreen", true);

                if (search && search.length >= 3) {
                    Card.query({ limit: (limit ? limit : 50), search: search },
                        function success(data) {
                            $rootScope.$emit("showLoadingScreen", false);

                            if (data.data.length) {
                                $scope.cards = data.data;
                            } else {
                                $scope.cards = oldCards;
                            }
                        });
                } else {
                    Card.query({ limit: 30 },
                        function success(data) {
                            $rootScope.$emit("showLoadingScreen", false);
                            $scope.cards = data.data;
                        });
                }
            };

            // $scope.onSelectCard = function($item, $model){
            //     console.log($item, $model);
            // };

            var lastStocks = null;
            var lastStockSearch = null;

            $scope.listStocks = function (search, limit) {

                $rootScope.$emit("showLoadingScreen", true);

                lastStockSearch = search;

                var query = {
                    search: search,
                    orderBy: 'provider.name',
                    sortedBy: 'asc',
                    company: $scope.company.id,
                    limit: limit ? limit : 100,
                    with_miles: 0
                };

                Stock.query(query,
                    function success(data) {
                        $rootScope.$emit("showLoadingScreen", false);

                        if (data.data && data.data.length) {
                            $scope.stocks = data.data;
                            lastStocks = data.data;
                        } else {
                            $scope.stocks = lastStocks;
                        }
                    });
            };

            $scope.onSelectStock = function (item) {
                $scope.selectedStock = item;

                if (item.provider) {
                    $scope.emissionRequest.provider = item.provider;
                }

                $scope.emissionRequest.stock_id = item.id;
            };

            $scope.close = function () {
                $uibModalInstance.close();
            };

            /**
             *
             * @param emissionRequest
             * @param premium
             */
            $scope.save = function (emissionRequest, premium) {
                $scope.sending = true;

                emissionRequest.premium_flight = premium;
                emissionRequest.save_and_emit = false;

                emissionRequest.$save(
                    function success(data) {
                        $scope.sending = false;

                        if (!data.error) {
                            $uibModalInstance.close();
                            toastr.success("Solicitado com sucesso!");
                        } else {
                            toastr.success("Falha ao solicitar!");
                        }
                    },
                    function error() {
                        $scope.sending = false;
                    }
                );
            };

            /**
             *
             */
            $scope.stopEmission = function () {

                var data = {
                    id: $scope.emissionRequest.id,
                    status: 4
                };

                EmissionRequest.update({ id: $scope.emissionRequest.id }, data,
                    function success(data) {
                        if (!data.error) {
                            $scope.sending = false;
                            $scope.showError = true;
                            $scope.errorMessage = 'Emissão cancelada';
                            stopTimer();
                        }
                    });
            };



            /**
             *
             * @param emissionRequest
             */
            $scope.saveAndEmit = function (emissionRequest, premium, isService) {
                $scope.sending = true;

                emissionRequest.premium_flight = premium;
                emissionRequest.save_and_emit = true;

                if (isService) emissionRequest.service = 'skyteam';

                startTimer();

                emissionRequest.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.emissionRequest = data.data || data;
                        }

                        //stopTimer();
                        //$scope.sending = false;
                        //
                        //if (!data.error) {
                        //    $scope.emissionRequest = data.data;
                        //    $scope.showError = false;
                        //    $scope.success = true;
                        //}else{
                        //    stopTimer();
                        //    $scope.showError = true;
                        //    $scope.sending = false;
                        //    $scope.errorMessage = data.data.message;
                        //}
                    },
                    function error(data) {
                        stopTimer();
                        $scope.showError = true;
                        $scope.errorMessage = data.data.message;
                        $scope.sending = false;
                    }
                );
            };

            var timer = null;
            $scope.seconds = 0;

            var startTimer = function () {
                $scope.showForm = false;

                $rootScope.$emit("blockScreen", true);

                timer = $interval(function () {
                    $scope.seconds++;

                    if ($scope.seconds > 180) {
                        $rootScope.$emit("blockScreen", false);
                        $scope.enableCancel = true;
                    }

                    EmissionRequest.get({ id: $scope.emissionRequest.id },
                        function success(data) {
                            if (data && (data.data || data)) {
                                $scope.emissionRequest = data.data || data;

                                if ($scope.emissionRequest && $scope.emissionRequest.status == 3) {
                                    stopTimer();
                                    $scope.success = true;
                                    $scope.showError = false;
                                    $scope.errorMessage = $scope.emissionRequest.last_message;
                                    $scope.enableCancel = false;
                                }

                                if ($scope.emissionRequest && $scope.emissionRequest.status == 4) {
                                    stopTimer();
                                    $scope.success = false;
                                    $scope.showError = true;
                                    $scope.errorMessage = $scope.emissionRequest.last_message;
                                    $scope.enableCancel = true;
                                }
                            }

                        });
                }, 1000);
            };

            var stopTimer = function () {
                $rootScope.$emit("blockScreen", false);
                $interval.cancel(timer);
            };

            init();
        }]);

