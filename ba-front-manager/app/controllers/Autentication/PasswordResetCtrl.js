//Controller Password Reset
angular
    .module('app.controllers')
    .controller('PasswordResetCtrl', ['$scope', '$state', 'User', 'appConfig', 'toastr',
            function ($scope, $state, User, appConfig, toastr) {

            $scope.reseter = {
                password: null,
                token: $state.params.token
            };

            $scope.button = false;
            $scope.btnButton = 'Recuperar';

            var controleButtonAtivar = function () {
                $scope.button = false;
                $scope.btnButton = 'Recuperar';
            };

            //Recuperando password
            $scope.resetPassword = function (reseter) {

                if ($scope.form.$valid) {

                    $scope.button = true;
                    $scope.btnButton = 'Processando...';

                    User.passwordReset({}, reseter,
                        function success(response) {
                            if (!response.error) {
                                toastr.success(response.message, 'Senha alterada!');
                                controleButtonAtivar();
                                $state.go('appSimple.login');
                            } else {
                                toastr.error(response.message);
                            }
                        }, function error() {
                            controleButtonAtivar();
                        });
                }
            };

        }]);
