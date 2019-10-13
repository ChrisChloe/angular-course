/**
 * FinancialReceiptsViewCtrl controller
 */
angular
    .module('app.controllers')
    .controller('FinancialReceiptsViewCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialReceipts',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialReceipts) {

            $scope.resource           = FinancialReceipts;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.receipts           = [];

            /**
             * Initializer
             * @param void
             * @return void
             */
            var init = function () {
                if ($state.params.id) {
                    $scope.filterCriteria.addParam('reference', $state.params.id);
                }
                $scope.filterCriteria.addParam('resource', 'api.receipt.by.reference');
            };

            /*
            *
            * Get available banks from financial api
            * @param void
            * @return void
            */
            $scope.getBanks = function() {
                FinancialReceipts.getBanks({}, {resource: 'api.receipts.banks'},
                    function success(data) {
                        $scope.banks = data.data;
                    });
            };

            /*
            *
            * Get available clients from financial api
            * @param void
            * @return void
            */
            $scope.getClients = function() {
                FinancialReceipts.getClients({}, {resource: 'api.clients'},
                    function success(data) {
                        $scope.clients = data.data;
                    });
            };

            /*
            *
            * Get available status from financial api
            * @param void
            * @return void
            */
            $scope.getStatus = function() {
                FinancialReceipts.getStatus({}, {resource: 'api.receipts.status'},
                    function success(data) {
                        $scope.status = data.data;
                    });
            };


            /**
             * Select all once
             *
             * @param receipts
             * @param selectedAll
             */
            $scope.selectAll = function(receipts, selectedAll){
                receipts.forEach(function (receipt) {
                    if(receipt.liquidated_at || receipt.liquidator_id){
                        receipt.selected = false;
                    }else{
                        receipt.selected = selectedAll;
                    }
                });
            };



            init();

        }]);
