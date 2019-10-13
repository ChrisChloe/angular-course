/**
 * Invoice Bank Transfer index controller
 */
angular
    .module('app.controllers')
    .controller('InvoiceToModalCtrl', ['$scope', '$state', '$emission', 'update', '$agency', '$location', 'appConfig', 'Emission', 'FinancialPayable', 'toastr', '$uibModal', '$uibModalInstance', 'Upload',
        function ($scope, $state, $emission, update, $agency, $location, appConfig, Emission, FinancialPayable, toastr, $uibModal, $uibModalInstance, Upload) {

            $scope.typePayments = appConfig.typePayments;
            $scope.bank_accounts = [];

            $scope.attachment = {
                file: null,
                type: "Transferência Bancária",
                description: "",
                agency: $agency
            };

            var init = function () {

                $scope.emission = $emission;

                FinancialPayable.getBanks({}, { resource: 'api.payments.banks' },
                    function success(data) {
                        $scope.bank_accounts = data.data;
                    });
            }
            init();


            $scope.toInvoice = function (invoice) {


                if (invoice.type_payment === 4 && !$scope.attachment.file) {
                    $scope.$emit('confirm-end');
                    toastr.warning('Selecione um arquivo para anexar');
                    return;
                }


                Emission.invoiceTo({ emission: $emission, type_payment: invoice.type_payment, bank_account_id: invoice.bank_account_id },
                    function success(data) {
                        if (!data.error) {

                            if (invoice.type_payment === 4) {

                                Upload.upload({
                                    url: appConfig.baseUrl + '/attachments',
                                    data: $scope.attachment
                                }).then(
                                    function success(resp) {
                                        if (resp.error) {
                                            toastr.error('Não foi possível salvar!');
                                        } else {
                                            toastr.success("Faturado e Anexado com Sucesso");
                                            $uibModalInstance.dismiss('cancel');
                                            update.refresh();

                                        }
                                    });

                            } else {
                                toastr.success("Faturado com Sucesso");
                                $uibModalInstance.dismiss('cancel');
                                update.refresh();
                            }



                        }
                    });

            };

            $scope.fileSelected = function () {
                if (!$scope.attachment.description && $scope.attachment.file) {
                    $scope.attachment.description = $scope.attachment.file.name.replace(/[-_]/g, " ");
                }
            };

        }]);

