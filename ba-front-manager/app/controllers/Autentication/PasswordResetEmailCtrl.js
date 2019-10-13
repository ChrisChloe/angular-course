//Controller Password Reset
angular
    .module('app.controllers')
    .controller('PasswordResetEmailCtrl', ['$scope', '$state', 'User', 'appConfig', 'toastr',
            function ($scope, $state, User, appConfig, toastr) {

            $scope.button = false;
            $scope.btnButton = 'Recuperar';

            var controleButtonAtivar = function () {
                $scope.button = false;
                $scope.btnButton = 'Recuperar';
            };

            //Recuperando password
            $scope.sendResetEmail = function (user) {

                if ($scope.form.$valid) {
                    $scope.button = true;
                    $scope.btnButton = 'Processando...';

                    User.passwordEmail({}, user,
                        function success(response) {
                            controleButtonAtivar();
                            toastr.success(response.message, 'Solicitação enviada!');
                            $state.go('appSimple.login');
                        }, function error() {
                            controleButtonAtivar();
                        });
                }
            };

        }]);
