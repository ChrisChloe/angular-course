/**
 * ReembolsoEmitted controller
 */
angular
    .module('managerApp')
    .controller('ReembolsoEmittedCtrl', ['$scope', 'appConfig', 'Refund', 'toastr',
        function ($scope, appConfig, Refund, toastr) {
            $scope.resource = Refund;

            $scope.refunds = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.openDetails = function (refund) {
                refund.open = !refund.open;
            };
            var init = function () {
                $scope.filterCriteria.addParam('status', 2);

            };

            init();
        }]);