/**
 * OpArchived controller
 */
angular
    .module('managerApp')
    .controller('RefundCtrl', ['$scope', 'appConfig', 'Provider', 'toastr',
        function ($scope, appConfig, Provider, toastr) {

                $scope.resource       = Provider;
                $scope.filterCriteria = appConfig.filterCriteria();

                $scope.providers    = [];

                var init = function () {
                     $scope.filterCriteria.addParam('has_refunds', 1);
                };

                $scope.filter = function(search){
                        $scope.$broadcast('onSearch', search);
                };

                init();
        }]);

