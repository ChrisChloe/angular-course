/**
 * Api create controller
 */
angular
    .module('app.controllers')
    .controller('AccountPaidCreateCtrl', ['$scope', '$state', 'appConfig', 'AccountPaid', 'toastr', '$location', 'userUtils',
        function ($scope, $state, appConfig, AccountPaid, toastr, $location, userUtils) {

            if(userUtils.isManager() || userUtils.isFinancial()) {

                var init = function () {
                    $scope.account_paid = new AccountPaid();

                    if ($state.params.id) {
                        $scope.account_paid.bank_account_id = parseInt($state.params.id);
                    }

                    AccountPaid.getBankAccounts({}, {resource: 'api.bank.accounts.list'},
                        function success(data) {
                            $scope.bank_accounts = data.data;
                        })
                    AccountPaid.getDebitTypes({}, {resource: 'api.receipts.debit.types'},
                        function success(data) {
                            $scope.debit_types = data.data;
                        });

                };

                $scope.save = function (account_paid) {
                    account_paid.resource = 'api.receipts.debit.create';
                    AccountPaid.save({}, account_paid,
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Salvo!");
                                $state.go('app.account-paid');
                            } else {
                                toastr.error(data.message);
                            }
                        }
                    );
                };

                init();
            } else {
                $location.path( "/#" );
            }
        }]);
