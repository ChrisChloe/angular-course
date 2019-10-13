/**
 * Api index controller
 */
angular
    .module('app.controllers')
    .controller('AccountPaidCtrl', ['$scope', '$state', 'appConfig', 'AccountPaid', 'userUtils', '$location',
        function ($scope, $state, appConfig, AccountPaid, userUtils, $location) {

            if(userUtils.isManager() || userUtils.isFinancial()) {

                $scope.accounts_paid = [];
                $scope.bank_accounts = [];
                $scope.debit_types   = [];

                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource       = AccountPaid;

                var init = function () {
                    $scope.filterCriteria.addParam('resource', 'api.receipts.bank.debits');

                    AccountPaid.getBankAccounts({}, {resource: 'api.bank.accounts.list'},
                        function success(data) {
                            $scope.bank_accounts = data.data;
                        });

                    AccountPaid.getDebitTypes({}, {resource: 'api.receipts.debit.types'},
                        function success(data) {
                            $scope.debit_types = data.data;
                        });
                };

                $scope.filter = function (search) {
                    $scope.$broadcast('onSearch', search);
                };

                init();
            } else {
                $location.path( "/#" );
            }
        }]);

