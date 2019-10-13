/**
 * OpIndex controller
 */
angular
    .module('app.controllers')
    .controller('OpChangeFormPaymentCtrl', ['$scope', 'id', 'Op', '$uibModalInstance', 'toastr', '$window', 'waitScope',
        function ($scope, id, Op, $uibModalInstance, toastr, $window, waitScope) {

            /**
             * Initializer
             */
            $scope.isValidToChange = false;
            $scope.btnValue = 'Confirmar';

            var init = function () {
                Op.get({id: id}, function (data) {
                    $scope.op = data.data;
                    $scope.form_payment = $scope.op.form_payment.toString();
                });
            };

            $scope.verifyIsValid = function () {
                $scope.isValidToChange = ($scope.form_payment !== $scope.op.form_payment.toString());
            };

            $scope.updateFormPayment = function () {
                Op.updateFormPayment({id: $scope.op.id}, {form_payment: $scope.form_payment},
                    function success(response) {
                        if (response.error) return response;
                        toastr.success('Atualizado com sucesso!');
                        $scope.close();
                        waitScope.refresh();
                    }, function error(err) {
                        toastr.error('Não foi possível alterar a forma de pagamento!' + err.message);
                    });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

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

            init();

        }]);

