/**
 * Stock Detail controller
 */
angular
    .module('managerApp')
    .controller('StockDetailCtrl', ['$scope', '$rootScope', 'appConfig', 'stock_id', 'Stock', 'StockLog', 'toastr', '$uibModalInstance',
        function ($scope, $rootScope, appConfig, stock_id, Stock, StockLog, toastr, $uibModalInstance) {

            $scope.stock = null;
            $scope.logs = [];

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = StockLog;

            var init = function () {

                Stock.get({id: stock_id},
                    function success(response) {
                        $scope.stock = response.data;
                    });

                $scope.filterCriteria.addParam('stock_id', stock_id);
            };

            $scope.getTransactionText = function (log) {

                if (log.transaction_type == 'credit') {
                    return 'compra';
                } else if (log.transaction_type == 'refund') {
                    return 'reembolso Nº ' + log.wintour_sale;
                } else if (log.transaction_type == 'cancellation') {
                    return 'cancelamento Nº ' + log.wintour_sale;
                }

                return 'venda Nº ' + log.wintour_sale;
            };

            $scope.getTransactionClass = function (log) {
                if (log.transaction_type == 'credit') {
                    return 'success';
                } else if (log.transaction_type == 'refund' && log.transaction_type == 'cancellation') {
                    return 'warning';
                } else if (log.transaction_type == 'debit' && log.refunded == 1) {
                    return 'danger my-hr';
                }
                return 'danger';
            };

            $scope.close = function () {
                $uibModalInstance.close();
            };

            init();
        }]);

