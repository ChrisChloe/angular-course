/**
 * controller
 */
angular
    .module('managerApp')
    .controller('ReportDetailCtrl', ['$scope', 'report', 'update', 'Report', 'toastr', '$uibModalInstance',
        function ($scope, report, update, Report, toastr, $uibModalInstance) {
            $scope.report = report;

            var init = function () {  
            };

            $scope.close = function(){
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

