/**
 * Invoice Bank Transfer index controller
 */
angular
    .module('app.controllers')
    .controller('InvoiceBankTransferCtrl', ['$scope', '$state', '$location', 'appConfig', 'Invoice', 'toastr', '$uibModal', 'userUtils', 'Op', '$window',
        function ($scope, $state, $location, appConfig, Invoice, toastr, $uibModal, userUtils, Op, $window) {

            if (userUtils.isFinancial()) {
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

                $scope.verifyAttachment = function (attachments) {
                    var result = false;

                    for (var key in attachments) {
                        if (attachments[key].is_valid == 1) {
                            result = true;
                        }
                    }

                    return result;
                };

                $scope.liquidateModal = function (invoice) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/invoice/modal/bank-transfer-liquidate-option.html',
                        size: 'sm',
                        controller: 'LiquidateCtrl',
                        resolve: {
                            $invoice: invoice,
                            update: $scope
                        }
                    });
                };


                var init = function () {
                    $scope.filterCriteria.addParam('gateway_type', 4);
                    $scope.filterCriteria.addParam('status', 2);
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
                    Invoice.liquidate({ id: invoice.id }, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Fatura Liquidada!");
                                $scope.refreshing = true;
                                $scope.$broadcast('onRefresh');
                            }
                        }
                    );
                };

                $scope.downloadFile = function (filename, op_id) {

                    Op.downloadFileTransfer({ id: op_id, filename: filename }, {},
                        function success(response) {
                            if (response.data.error) return response;
                            $scope.$emit('download-end');

                            var file = new Blob([response.data], { type: response.content_type });
                            var url = (window.URL || window.webkitURL).createObjectURL(file);
                            $window.open(url);
                            init();

                        }, function error(err) {
                            $scope.$emit('download-end');
                            toastr.error('Não foi possível baixar!' + err.message);
                        });

                };
                init();
            } else { window.history.back(); }

        }]);

