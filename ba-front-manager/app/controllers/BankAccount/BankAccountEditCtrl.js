/**
 * Api create controller
 */
angular
    .module('app.controllers')
    .controller('BankAccountEditCtrl', ['$scope', '$state', '$filter', 'BankAccount', 'toastr', '$location', 'userUtils',
        function ($scope, $state, $filter, BankAccount, toastr, $location, userUtils) {

            if(userUtils.isManager() || userUtils.isFinancial()) {
                $scope.bank_account = {};
                $scope.edit         = true;

                var init = function () {
                    BankAccount.get({}, {id: $state.params.id, resource: 'api.bank.accounts.list'},
                        function success(data) {
                            $scope.bank_account = data.data[0];
                        });
                };

                $scope.save = function (bank_account) {
                    bank_account.resource = 'api.bank.accounts.update';
                    BankAccount.update({}, bank_account,
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Atualizado!");
                                $state.go('app.bank-account');
                            } else {
                                toastr.error(data.message);
                            }
                        });
                };

                init();
            } else {
                $location.path( "/#" );
            }
        }]);
