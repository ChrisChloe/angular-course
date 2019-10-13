/**
 * EmailConfig create controller
 */
angular
    .module('app.controllers')
    .controller('EmailConfigCreateCtrl', ['$scope', '$state', 'appConfig', 'EmailConfig', 'toastr',
        function ($scope, $state, appConfig, EmailConfig, toastr) {
            $scope.title = "Adicionar Configuração de email";
            $scope.config = null;

            var init = function () {
                $scope.config = new EmailConfig();
            };

            $scope.save = function (config) {
                config.$save(
                    function success(data) {
                        if (!data.error) {
                            $state.go('app.email-config', data.data);
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            init();
        }]);
