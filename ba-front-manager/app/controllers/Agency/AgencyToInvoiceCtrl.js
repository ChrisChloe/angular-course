/**
 * AgencyToInvoiceCtrl controller
 */
angular
    .module('app.controllers')
    .controller('AgencyToInvoiceCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'Agency', 'Emission', 'Invoice', 'Credit', '$uibModal',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, Agency, Emission, Invoice, Credit, $uibModal) {


            var agencyId = $state.params.id;
            $scope.resource = Agency;

            $scope.liquidate = {
                emissions: [],
                total: 0,
                count: 0
            };

            $scope.crmUrl = appConfig.crmUrl;
            $scope.agency = [];
            $scope.agencies = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.emissions = [];

            $scope.liquidating = false;
            $scope.use_all_credit = false;
            $scope.selectedAll = false;

            /**
             *
             * Initializer
             * @return void
             */
            var init = function () {

                if (agencyId) {
                    loadAgency();                    
                } else {
                    $scope.resourceFunction = 'agenciesToInvoice';

                }

            };

            /**
             * Load and Reload Agency
             */
            var loadAgency = function () {
                Agency.agencyToInvoice({ id: agencyId },
                    function success(data) {
                        $scope.agency = data.data;
                    });
            };

            /**
             *
             * Filter
             * @param search
             * @return void
             */
            $scope.filter = function (search) {

                if (search.start_date && search.end_date) {
                    search.start_date = moment(moment(search.start_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                    search.end_date = moment(moment(search.end_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                }

                $scope.$broadcast('onSearch', search);
            };

            /**
             * Show modal credits
             * @param agency
             */
            $scope.showCredits = function (agency) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/agency-credits-show.html',
                    controller: 'AgencyCreditsShowCtrl',
                    size: 'lg',
                    resolve: {
                        id: agency.id
                    }
                });

                modalInstance.result.then(function () {
                    loadAgency();
                    $scope.$broadcast('onRefresh');
                });
            };

            /**
             * Show modal invoice
             */
            $scope.openLiquidateModal = function (liquidate) {

                var due_date = $scope.agency.due_date_invoice;

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/to-invoice-create.html',
                    controller: 'AgencyToInvoiceCreateCtrl',
                    size: 'md',
                    resolve: {
                        due_date: function () {
                            return due_date;
                        },
                        agency: function () {
                            return agencyId;
                        },
                        emissions: function () {
                            return liquidate.emissions;
                        },
                        total: function () {
                            return liquidate.total;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    loadAgency();
                    $scope.$broadcast('onRefresh');
                });

            };

            $scope.getTotalAmount = function(invoice) {

                console.log(invoice.miles_price);
                console.log(invoice.shipping_rate);
                console.log(invoice.baggage_price);

                return parseFloat(invoice.miles_price) + parseFloat(invoice.shipping_rate) + parseFloat(invoice.baggage_price);
            };

            /**
             * Control selected emissions
             */
            $scope.$watch('agency.emissions_to_invoice|filter:{selected:true}', function (emissions) {
                if (emissions) {
                    console.log(emissions);
                    
                    $scope.liquidate.total = emissions.reduce(function (total, emission) {
                        return total + (parseInt(emission.miles_price) + parseInt(emission.shipping_rate) + parseInt(emission.baggage_price));
                    }, 0);
    
                    $scope.liquidate.total = Math.round($scope.liquidate.total * 100) / 100;
    
                    $scope.liquidate.count = emissions.length;
                    $scope.liquidate.emissions = emissions.map(function (emission) {
                        return emission.id;
                    });
                }

            }, true);

            /**
             * Select all once
             *
             * @param emissions
             * @param selectedAll
             */
            $scope.selectAll = function (emissions, selectedAll) {
                emissions.forEach(function (emission) {
                    emission.selected = selectedAll;
                });
            };

            init();

        }]);
