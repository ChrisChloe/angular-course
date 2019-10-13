/**
 * Invoice Bank Transfer index controller
 */
angular
    .module('app.controllers')
    .controller('LiquidateCtrl', ['$scope', '$state', '$invoice', 'update', '$location', 'appConfig', 'Invoice', 'toastr', '$uibModal', '$uibModalInstance', 'userUtils', '$window',
        function ($scope, $state, $invoice, update, $location, appConfig, Invoice, toastr, $uibModal, $uibModalInstance, userUtils, $window) {
            
            var init = function(){
                $scope.invoice = $invoice;
            };
            init();
            $scope.todayFilter = moment().format('DD/MM/YYYY');

            $scope.liquidate = function (amount,release_date_of) {
                if(amount>0){
                    Invoice.liquidate({id: $scope.invoice.id, amount_partial: amount, release_date_of: release_date_of},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Fatura Liquidada!");
                                $uibModalInstance.dismiss('cancel');
                                update.refresh();
                            }
                        }
                    );
                }else{
                    toastr.warning('O valor a ser liquidado não pode ser zero');
                }

            };

        }]);

