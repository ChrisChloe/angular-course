/**
 * EmailAccount index controller
 */
angular
    .module('app.controllers')
    .controller('EmailAccountCtrl', ['$scope', '$state', 'appConfig', 'EmailAccount', 'toastr',
        function ($scope, $state, appConfig, EmailAccount, toastr) {

            $scope.resource = EmailAccount;

            $scope.accounts = [];

            var init = function () {
                $scope.$on("itemRestored", function (event, account) {
                    $scope.accounts.push(account);
                });
            };

            $scope.inactivate = function (account) {
                var status = + !account.status;

                EmailAccount.update({id: account.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            account.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.account');
                        }
                    });
            };

            $scope.trash = function (account) {
                EmailAccount.delete({id: account.id}, account,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', account);
                            $scope.accounts.splice($scope.accounts.indexOf(account), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            init();
        }]);

