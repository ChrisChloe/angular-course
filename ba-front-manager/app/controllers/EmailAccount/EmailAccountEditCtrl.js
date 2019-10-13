/**
 * MailAccount edit controller
 */
angular
    .module('app.controllers')
    .controller('EmailAccountEditCtrl', ['$scope', '$state', 'appConfig', '$filter', 'EmailAccount', 'EmailConfig', 'toastr',
        function ($scope, $state, appConfig, $filter, EmailAccount, EmailConfig, toastr) {
            var accountId  = $state.params.id;

            $scope.title  = "Editar Configuração";
            $scope.account = null;

            $scope.configs = [];

            var init = function () {
                EmailAccount.get({id: accountId},
                    function success(data) {
                        $scope.account = data.data;
                    });

                EmailConfig.query({limit: 99999}, {},
                    function(response){
                        $scope.configs = response.data;
                    });
            };

            $scope.save = function (account) {

                EmailAccount.update({id: account.id}, account,
                    function success(data) {
                        if (!data.error){
                            toastr.success("Atualizado!");
                            $state.go('app.mail-account');
                        }
                    });
            };

            init();
        }]);
