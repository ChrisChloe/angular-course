/**
 * Invoice Pag Seguro index controller
 */
angular
    .module('app.controllers')
    .controller('InvoiceBilletCtrl', ['$scope', '$state', '$location', 'appConfig', 'Invoice', 'toastr', '$uibModal', 'userUtils', 'FinancialReceipts',
        function ($scope, $state, $location, appConfig, Invoice, toastr, $uibModal, userUtils, FinancialReceipts) {

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

                $scope.download = function (id) {
                    var reference = { reference: id }
                    Invoice.downloadPdf(reference, {},
                        function success(response) {
                            var file = new Blob([response.data], { type: response.content_type });
                            var url = (window.URL || window.webkitURL).createObjectURL(file);

                            var a = document.createElement('a');
                            document.getElementsByTagName("body")[0].appendChild(a);

                            a.href = url;
                            a.download = 'boleto';
                            a.target = '_blank';
                            a.click();

                            toastr.success('Download realizado.');

                        },
                        function error() {
                            toastr.error('Não foi possível baixar!');
                        }
                    );
                }


                var init = function () {
                    $scope.filterCriteria.addParam('gateway_type', 3);
                };

                $scope.filter = function (search) {
                    if ((search.min_date && !search.max_date) || (!search.min_date && search.max_date)) {
                        toastr.warning("Preencha as duas datas");
                        return;
                    }

                    if (search.min_date && search.max_date) {
                        search.start_date = moment(search.min_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                        search.end_date = moment(search.max_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    } else {
                        search.start_date = '';
                        search.end_date = '';
                    }

                    $scope.$broadcast('onSearch', search);

                };

                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');

                };

                $scope.cancelReceipts = function (invoice) {

                    FinancialReceipts.cancelBillets({}, {
                        reference: invoice.id,
                        client_id: 1

                    },

                        function success(response) {

                            if (response.error) {
                                toastr.error(response.message);
                                return false;
                            }

                            toastr.success('Boleto cancelado ! ');
                            $scope.$broadcast('onRefresh');
                        },

                        function error(response) {
                            toastr.error(response.errors);
                        });
                };

                init();
            } else { window.history.back(); }

        }]);

