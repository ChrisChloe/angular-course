/**
 * UnifiedInvoices controller
 */
angular
    .module('app.controllers')
    .controller('UnifiedInvoicesCtrl', ['$scope', 'appConfig', 'Invoice', 'toastr',
        function ($scope, appConfig, Invoice, toastr) {

            $scope.resource = Invoice;
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.invoices = [];

            var GATEWAY_TYPES = {
                "Cielo Crédito": 1,
                "Cielo Débito": 2,
                "Boleto": 3,
                "Transferência Bancária": 4,
                "PagSeguro": 5
            };

            $scope.typePayments = appConfig.typePayments;
            $scope.invoiceStatus = appConfig.invoiceStatus;
            


            var init = function () {
            };

            $scope.listFilter = function(filter) {

                console.log(filter);
                

                if(filter.date_from && filter.date_to){
                    filter.start_due_date = moment(filter.date_from, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    filter.end_due_date = moment(filter.date_to, 'DD/MM/YYYY').format('YYYY-MM-DD'); 
                } else if(filter.date_from || filter.date_to) {
                    toastr.warning('Preencha os dois campos de data.')
                }

                $scope.$broadcast('onSearch', filter);
            };

            $scope.limitCorrection = function (filter) {
                if (moment(filter.date_from, 'DD/MM/YYYY').format('YYYY-MM-DD') > moment(filter.date_to, 'DD/MM/YYYY').format('YYYY-MM-DD')) {
                    filter.date_to = filter.date_from;
                }

            }
            
            $scope.returnTypeTitle = function(type) {
                var title = "ND";

                Object.keys(GATEWAY_TYPES).forEach(function(gateway, index) {
                    if(index === type - 1) title = gateway;
                });

                return title;
            }

            init();
        }]);
