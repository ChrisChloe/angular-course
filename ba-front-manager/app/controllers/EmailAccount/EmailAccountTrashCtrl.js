/**
 * EmailAccount index controller
 */
angular
    .module('app.controllers')
    .controller('EmailAccountTrashCtrl', ['$scope', '$state', 'appConfig', 'EmailAccount', 'toastr',
        function ($scope, $state, appConfig, EmailAccount, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = EmailAccount;

            $scope.accounts = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, account) {
                    $scope.accounts.push(account);
                });
            };

            $scope.delete = function (account) {
                EmailAccount.delete({id: account.id}, account,
                    function success(data) {
                        if (!data.error){
                            $scope.accounts.splice($scope.accounts.indexOf(account), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.restore = function (account) {

                EmailAccount.restore({id: account.id}, account,
                    function success(data) {
                        $scope.$emit('itemRestored', account);
                        if (!data.error){
                            $scope.accounts.splice($scope.accounts.indexOf(account), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

