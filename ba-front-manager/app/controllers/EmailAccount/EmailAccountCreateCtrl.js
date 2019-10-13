/**
 * EmailConfig create controller
 */
angular
    .module('app.controllers')
    .controller('EmailAccountCreateCtrl', ['$scope', '$state', 'appConfig', 'EmailAccount', 'EmailConfig', 'toastr',
        function ($scope, $state, appConfig, EmailAccount, EmailConfig, toastr) {
            $scope.title = "Adicionar Endereço de email";

            $scope.account = null;
            $scope.configs = [];

            var init = function () {
                $scope.account = new EmailAccount();

                EmailConfig.query({limit: 99999}, {},
                    function(response){
                        $scope.configs = response.data;
                    });
            };

            $scope.save = function (account) {
                account.$save(
                    function success(data) {
                        if (!data.error) {
                            $state.go('app.mail-account', data.data);
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            init();
        }]);
