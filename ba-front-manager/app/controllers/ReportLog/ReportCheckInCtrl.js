/**
 * Company index controller
 */
angular
    .module('app.controllers')
    .controller('ReportCheckInCtrl', ['$scope', '$state', 'appConfig', 'Report', 'toastr', '$uibModal',
        function ($scope, $state, appConfig, Report, toastr, $uibModal) {

            $scope.resource = Report;
            $scope.reports = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            var init = function () {
                $scope.filterCriteria.addParam('type', 'check-in');
            };

            $scope.show = function (id, report) {
            
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/report-log/modals/details.html',
                        controller: 'ReportDetailCtrl',
                        size: 'lg',
                        resolve: {
                            report: report,
                            update: $scope
                        }
                    });

                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');
                };

                modalInstance.result.then(function () {
                    load();
                });
            };

            init();
        }]);

