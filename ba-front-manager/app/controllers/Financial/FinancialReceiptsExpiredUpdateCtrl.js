/**
 * FinancialReceiptsExpiredUpdateCtrl controller
 */
angular
    .module('app.controllers')
    .controller('FinancialReceiptsExpiredUpdateCtrl', ['$scope', '$rootScope', 'receipts', 'toastr', '$filter', 'FinancialReceiptsExpired', '$uibModalInstance',
        function ($scope, $rootScope, receipts, toastr, $filter, FinancialReceiptsExpired, $uibModalInstance) {

            $scope.due_date = null;
            $scope.receipts = receipts;
            $scope.sending = false;

            /**
             *
             * Initializer
             * @return void
             */
            var init = function () {

            };

            $scope.close = function(){
                $uibModalInstance.close();
            };


            $scope.send = function(){

                if(!$scope.due_date){
                    return toastr.error('Vencimento é obrigatório');
                }

                var receiptsAmount = $scope.receipts.length;

                $scope.sending = true;
                $scope.sended = true;

                var dueDate = moment(moment($scope.due_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');

                $scope.receipts.forEach(function(receipt){

                    receipt.updating = true;

                    FinancialReceiptsExpired.calcInterest({}, {
                            due_date: dueDate,
                            reference: receipt.reference,
                            client_id: 1
                        },
                        function success(response) {
                            receiptsAmount--;

                            receipt.due_date_updated = true;
                            receipt.updating = false;

                            if(response.error){
                                receipt.updating_error = response.message;
                                if(response.errors){
                                    receipt.updating_error = response.errors.reduce(function(message, error) {
                                        if(message){
                                            message += ", ";
                                        }
                                        return message + error;
                                    }, "");
                                }
                            }else{
                                $scope.$broadcast('onRefresh');
                                receipt.due_date = dueDate;
                            }

                            if(receiptsAmount == 0){
                                $scope.sending = false;
                            }

                        },
                        function error(response) {
                            receipt.updating = false;
                            receipt.updating_error = response.error;
                            if(response.errors){
                                receipt.updating_error = response.errors.reduce(function(message, error) {
                                    if(message){
                                        message += ", ";
                                    }
                                    return message + error;
                                }, "");
                            }

                            receiptsAmount--;

                            if(receiptsAmount == 0){
                                $scope.sending = false;
                            }

                            toastr.error(response.errors);
                        });
                });


            };

            init();

        }]);
