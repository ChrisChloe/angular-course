/**
 * Api create controller
 */
angular
    .module('app.controllers')
    .controller('BankAccountCreateCtrl', ['$scope', '$state', 'appConfig', 'BankAccount', 'toastr', '$location', 'userUtils',
        function ($scope, $state, appConfig, BankAccount, toastr, $location, userUtils) {

            if(userUtils.isManager() || userUtils.isFinancial()) {
                var init = function () {
                    $scope.bank_account = new BankAccount();
                    BankAccount.getBanks({}, {resource: 'api.banks'},
                        function success(data) {
                            $scope.banks = data.data;
                        })
                };

                $scope.save = function (bank_account) {
                    bank_account.resource = 'api.bank.accounts.create';
                    BankAccount.save({}, bank_account,
                        function success(data) {
                            if (!data.error || !data.original.error) {
                                toastr.success("Salvo!");
                                $state.go('app.bank-account');
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
