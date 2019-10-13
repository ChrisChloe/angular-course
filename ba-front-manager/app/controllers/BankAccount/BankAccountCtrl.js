/**
 * Api index controller
 */
angular
    .module('app.controllers')
    .controller('BankAccountCtrl', ['$scope', '$state', 'appConfig', 'BankAccount',
        function ($scope, $state, appConfig, BankAccount) {

            $scope.bank_accounts = [];

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = BankAccount;

            var init = function () {
                $scope.filterCriteria.addParam('resource', 'api.bank.accounts.list');
            };

            init();
        }]);

