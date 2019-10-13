/**
 * ReportOpArchived controller
 */
angular
    .module('managerApp')
    .controller('ReportOpArchivedCtrl', ['$scope', 'appConfig', 'ReportOpArchived', 'toastr', 'userUtils', '$location',
        function ($scope, appConfig, ReportOpArchived, toastr, userUtils, $location) {

            $scope.total_ops = 0;
            $scope.counter = false;


            var init = function () {
                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.filterCriteria.addParam('status', '0');
                $scope.resource = ReportOpArchived;

                $scope.ops = [];

                $scope.filter.start_date = moment().format('DD/MM/YYYY');
                $scope.filter.end_date = moment().format('DD/MM/YYYY');

                var start_date = moment().format('YYYY-MM-DD');
                var end_date = moment().format('YYYY-MM-DD');
                
                $scope.filterCriteria.addParam('from', start_date);
                $scope.filterCriteria.addParam('to', end_date);
                
            };

            $scope.getTotalOps = function (ops) {
                if(!$scope.counter){
                    ops.forEach(function(op){
                        $scope.total_ops += op.quantity;
                    });
                    $scope.counter = true;
                }
            }

            $scope.filter = function (filter) {

                var search = {};
                search.from = moment(filter.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                search.to = moment(filter.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                $scope.$broadcast('onSearch', search);
                $scope.counter = false;
            };

            if(userUtils.isManager() || userUtils.isEmitter()){
                init();
            }else{
                $location.path( "/#" );
            }

        }]);

