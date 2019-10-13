/**
 * Api create controller
 */
angular
    .module('app.controllers')
    .controller('BankAccountShowCtrl', ['$scope', '$state', '$filter', 'BankAccount', 'toastr', '$location', 'userUtils',
        function ($scope, $state, $filter, BankAccount, toastr, $location, userUtils) {

            if(userUtils.isManager() || userUtils.isFinancial()) {
                $scope.bank_account = {};

                var init = function () {
                    BankAccount.get({}, {id: $state.params.id, resource: 'api.bank.accounts.list'},
                        function success(data) {
                            $scope.bank_account = data.data[0];
                        });
                };

                init();
            } else {
                $location.path( "/#" );
            }
        }]);
