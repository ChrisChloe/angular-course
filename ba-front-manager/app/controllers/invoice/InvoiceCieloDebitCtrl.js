/**
 * Invoice Cielo Debit index controller
 */
angular
    .module('app.controllers')
    .controller('InvoiceCieloDebitCtrl', ['$scope', '$state', '$location', 'appConfig', 'Invoice', 'toastr', '$uibModal','userUtils',
        function ($scope, $state, $location, appConfig, Invoice, toastr, $uibModal, userUtils) {

        if (userUtils.isFinancial()) {
            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Invoice;
            $scope.refreshing = false;
            $scope.invoices = [];

            $scope.search = {
                search: $location.search().search
            };
            $scope.callAtInterval = function () {
                $scope.refreshing = true;
                $scope.$broadcast('onRefresh');
            };


            var init = function () {
                $scope.filterCriteria.addParam('gateway_type', 2);
                $scope.filterCriteria.addParam('status',2);

            };

            $scope.filter = function (search) {
                if ((search.min_date && !search.max_date) || (!search.min_date && search.max_date)) {
                    toastr.warning("Preencha as duas datas");
                    return;
                }

                if(search.min_date && search.max_date){
                    search.start_date = moment(search.min_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    search.end_date = moment(search.max_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                }else{
                    search.start_date = '';
                    search.end_date = '';
                }

                search.status = 2;
                $scope.$broadcast('onSearch', search);

            };

            $scope.refresh = function () {
                $scope.refreshing = true;
                $scope.$broadcast('onRefresh');

            };
            $scope.liquidate = function (invoice) {
                Invoice.liquidate({id: invoice.id}, {},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Fatura Liquidada!");
                            $scope.refreshing = true;
                            $scope.$broadcast('onRefresh');
                        }
                    }
                );
            };

            init();
        }else {window.history.back();}

    }]);

