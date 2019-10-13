/**
 * EmissionToInvoiceCtrl controller
 */
angular
    .module('app.controllers')
    .controller('EmissionToInvoiceCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'Agency', 'Emission', 'Invoice', 'Credit','$uibModal',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, Agency, Emission, Invoice, Credit, $uibModal) {

            $scope.resource = Emission;

            /**
             *
             * @type {{emissions: Array, total: number, count: number}}
             */
            $scope.liquidate = {
                emissions: [],
                total: 0,
                count: 0
            };
            $scope.agency    = null;

            $scope.agencies  = [];
            $scope.emissions = [];
            $scope.filterCriteria = appConfig.filterCriteria();

            /**
             *
             * Initializer
             * @return void
             */
            var init = function () {
                if ($state.params.id) {
                    loadAgency();
                    $scope.filterCriteria.addParam('agency_id', $state.params.id);
                    $scope.filterCriteria.addParam('to_invoice', true);
                }
                
            };
            

            /**
             * Load and Reload Agency
             */
            var loadAgency = function () {
                Agency.get({id: $state.params.id},
                    function success(data) {
                        $scope.agency = data.data;
                    });
            };

            /**
             *
             * @param emission
             */
            $scope.invoiceTo = function (emission) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/agency/modals/emission-to-invoice-options.html',
                    size:        'md',
                    controller: 'InvoiceToModalCtrl',
                    resolve: {
                            $emission: emission,
                            update: $scope,
                            $agency: $scope.agency
                     }
                });

            };

            $scope.refresh = function () {
                $scope.refreshing = true;
                $scope.$broadcast('onRefresh');
            };

            /**
             * Show modal credits
             * @param agency
             */
            $scope.showCredits = function(agency){
                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/agency-credits-show.html',
                    controller:  'AgencyCreditsShowCtrl',
                    size:        'lg',
                    resolve: {
                        id:  agency.id
                    }
                });

                modalInstance.result.then(function () {
                    loadAgency();
                    $scope.$broadcast('onRefresh');
                });
            };
            init();

        }]);
