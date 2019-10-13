/**
 * Api index controller
 */
angular
    .module('app.controllers')
    .controller('AccountReceivedCtrl', ['$scope', '$state', 'appConfig', 'AccountReceived', 'userUtils', '$location',
        function ($scope, $state, appConfig, AccountReceived, userUtils, $location) {

            if(userUtils.isManager() || userUtils.isFinancial()) {

                $scope.accounts_received = [];
                $scope.bank_accounts     = [];
                $scope.credit_types      = [];

                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource       = AccountReceived;

                var init = function () {
                    $scope.filterCriteria.addParam('resource', 'api.receipts.bank.credits');

                    AccountReceived.getBankAccounts({}, {resource: 'api.bank.accounts.list'},
                        function success(data) {
                            $scope.bank_accounts = data.data;
                        });

                    AccountReceived.getCreditTypes({}, {resource: 'api.receipts.credit.types'},
                        function success(data) {
                            $scope.credit_types = data.data;
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

