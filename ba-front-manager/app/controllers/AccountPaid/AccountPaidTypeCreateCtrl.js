/**
 * Api create controller
 */
angular
    .module('app.controllers')
    .controller('AccountPaidTypeCreateCtrl', ['$scope', '$state', 'appConfig', 'AccountPaid', 'toastr', '$location', 'userUtils',
        function ($scope, $state, appConfig, AccountPaid, toastr, $location, userUtils) {

            if(userUtils.isManager() || userUtils.isFinancial()) {

                var init = function () {
                    $scope.account_paid_type = new AccountPaid();

                    if ($state.params.id) {
                        $scope.account_paid_type.parent_id = parseInt($state.params.id);
                    }

                    AccountPaid.query({parent_id: 0}, {resource: 'api.receipts.debit.types'},
                        function success(data) {
                            $scope.debit_types = data.data
                        });

                };

                $scope.save = function (account_paid_type) {
                    account_paid_type.resource = 'api.receipts.debit.types.create';
                    AccountPaid.save({}, account_paid_type,
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Salvo!");
                                $state.go('app.account-paid-type');
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
