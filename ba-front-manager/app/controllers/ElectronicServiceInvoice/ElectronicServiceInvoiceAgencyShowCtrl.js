/**
 * ElectronicServiceInvoiceAgencyShowCtrl controller
 */
angular
    .module('app.controllers')
    .controller('ElectronicServiceInvoiceAgencyShowCtrl', ['$scope', '$state', 'toastr', '$filter', '$uibModal', 'appConfig', 'ElectronicServiceInvoice', 'Agency', 'Emission',
        function ($scope, $state, toastr, $filter, $uibModal, appConfig, ElectronicServiceInvoice, Agency, Emission) {

            var agencyId = $state.params.id;

            $scope.agency = null;
            $scope.emissions = [];

            $scope.resource = Emission;
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.filterCriteria.addParam('no_electronic_service_invoice_id', 'true');
            $scope.filterCriteria.addParam('agency', agencyId);

            $scope.emit = {
                emissions: [],
                total: 0,
                count: 0
            };

            var init = function () {
                Agency.get({id: agencyId},
                    function success(data) {
                        $scope.agency = data.data;
                    });
            };

            $scope.openEmitModal = function(emit) {

                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/electronic-service-invoice/modals/create.html',
                    controller:  'ElectronicServiceInvoiceCreateCtrl',
                    size:        'md',
                    resolve: {
                        agency: function () {
                            return $scope.agency;
                        },
                        emissions: function () {
                            return emit.emissions;
                        },
                        total: function () {
                            return emit.total;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    //$scope.$broadcast('onRefresh');
                });

            };

            /**
             *
             */
            $scope.$watch('emissions|filter:{selected:true}', function (emissions) {

                $scope.emit.total = emissions.reduce(function(total, emission) {
                    return total + (emission.miles_price + emission.shipping_rate + emission.baggage_price);
                }, 0);

                $scope.emit.total = Math.round($scope.emit.total * 100) / 100;

                $scope.emit.count     = emissions.length;
                $scope.emit.emissions = emissions;
            }, true);

            /**
             *
             * @param emissions
             * @param selectedAll
             */
            $scope.selectAll = function(emissions, selectedAll){
                emissions.forEach(function (emission) {
                    emission.selected = selectedAll;
                });
            };

            init();

        }]);
