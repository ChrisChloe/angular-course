/**
 * OpIndex controller
 */
angular
    .module('app.controllers')
    .controller('OpShowAttachmentsCtrl', ['$scope', 'id', 'Op', '$uibModalInstance', 'toastr', '$window', 'financialScope', 'FinancialPayable',
        function ($scope, id, Op, $uibModalInstance, toastr, $window, financialScope, FinancialPayable) {

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.btnValue = 'Confirmar';
            $scope.isValidToApprove = false;

            $scope.bank_account_id = '';
            $scope.transfer_price  = 0;

            /**
             * Initializer
             */
            var init = function () {
                Op.get({id: id}, function (data) {
                    $scope.op = data.data;
                    if ($scope.op) {
                        $scope.verifyIsValid();
                        $scope.transfer_price = $scope.op.price;
                    }
                });
                FinancialPayable.getBanks({}, {resource: 'api.payments.banks'},
                    function success(data) {
                        $scope.bank_accounts = data.data;
                    });

            };

            $scope.verifyIsValid = function () {
                var array = [];
                var obj = $scope.op.attachments;

                for (var key in obj) {
                    if (obj[key].is_valid == 1) {
                        array[key] = obj[key];
                    }
                }

                $scope.isValidToApprove = array.length > 0;
            };

            $scope.downloadFile = function (filename) {
                $scope.btnId = '#' + filename.slice(0, 12);
                $scope.$emit('download-start');

                setTimeout(function () {
                    Op.downloadFileTransfer({id: $scope.op.id, filename: filename}, {},
                        function success(response) {
                            if (response.data.error) return response;
                            $scope.$emit('download-end');

                            var file = new Blob([response.data], {type: response.content_type});
                            var url = (window.URL || window.webkitURL).createObjectURL(file);
                            $window.open(url);
                            init();

                        }, function error(err) {
                            $scope.$emit('download-end');
                            toastr.error('Não foi possível baixar!' + err.message);
                        });
                }, 1000);

            };

            $scope.updateFile = function (attachment) {
                Op.updateFileTransferStatus({}, {id: $scope.op.id, attachment: attachment},
                    function success(response) {
                        if (response.error) return response;
                        toastr.success('Atualizado com sucesso!');
                        init();
                    }, function error(err) {
                        toastr.error('Não foi possível atualizar status do anexo!' + err.message);
                    });
            };

            $scope.$on('download-start', function () {
                $($scope.btnId).prop('ng-disabled', true);
                $($scope.btnId).attr('disabled', 'disabled');
                var fa = $($scope.btnId).children("i");
                fa.attr('class', 'fa fa-spinner fa-spin');
            });

            $scope.$on('download-end', function () {
                $($scope.btnId).prop('ng-disabled', false);
                $($scope.btnId).removeAttr('disabled');
                var fa = $($scope.btnId).children("i");
                fa.attr('class', 'fa fa-download');
            });

            $scope.$on('confirm-start', function () {
                $scope.btnValue = 'Confirmando...';
                $('#confirm-button').prop('ng-disabled', true);
                $('#confirm-button').attr('disabled', 'disabled');
                var fa = $('#confirm-button').children("i");
                fa.attr('class', 'fa fa-spinner fa-spin');
            });

            $scope.$on('confirm-end', function () {
                $scope.btnValue = 'Confirmar';
                $('#confirm-button').prop('ng-disabled', false);
                $('#confirm-button').removeAttr('disabled');
                var fa = $('#confirm-button').children("i");
                fa.attr('class', 'fa fa-send');
            });

            $scope.confirmOpTransfer = function (bank_account_id, transfer_price) {
                $scope.$emit('confirm-start');

                if(!bank_account_id){
                    $scope.$emit('confirm-end');
                    toastr.warning('Selecione um banco para confirmar a trasferência!');
                    $('#bank_account').focus();
                    return;
                }

                Op.updateStatusActiveBankTransfer({id: $scope.op.id}, {bank_account_id: bank_account_id, transfer_price: transfer_price},
                    function success(response) {
                        if (response.error) {
                            $scope.$emit('confirm-end');
                            toastr.error(response.message);
                            return;
                        }
                        toastr.success('Transferência confirmada com sucesso!');
                        $scope.close();
                        $scope.$emit('confirm-end');
                        financialScope.refresh();
                    });

            };

            init();

        }]);

