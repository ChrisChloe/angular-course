/**
 * Api index controller
 */
angular
    .module('app.controllers')
    .controller('AccountPaidTypeCtrl', ['$scope', '$state', 'appConfig', 'AccountPaid', 'userUtils', '$location',
        function ($scope, $state, appConfig, AccountPaid, userUtils, $location) {

            if(userUtils.isManager() || userUtils.isFinancial()) {

                $scope.account_paid_types = [];

                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource       = AccountPaid;

                var init = function () {
                    $scope.filterCriteria.addParam('resource', 'api.receipts.debit.types');
                };

                init();
            } else {
                $location.path( "/#" );
            }
        }]);

