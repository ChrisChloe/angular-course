/**
 * ReportAgencyCtrl controller
 */
angular
    .module('managerApp')
    .controller('ReportAgencyCtrl', ['$scope', '$cookies', 'Report', 'User', 'appConfig', 'toastr',
        function ($scope, $cookies, Report, User, appConfig, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Report;
            $scope.resourceFunction = "agency";

            $scope.reports = [];

            $scope.hideColumns = {
                today:false,
                yesterday:true,
                week:true,
                fortnight:true,
                total:true
            };

            $scope.spanColumns = 3;

            $scope.$watch('hideColumns', function(hideColumns){
                var leftColumns = 0;
                for(var col in hideColumns){
                    leftColumns+=!hideColumns[col];
                }
                $scope.spanColumns = leftColumns;
            }, true);

            var init = function () {
                $scope.filterCriteria.addParam('region', 'psv');
            };

            $scope.filter = function(search){
                search.region = 'nulo';
                $scope.$broadcast('onSearch', search);
            };

            $scope.openDetails = function(agency){
                agency.open = !agency.open;

                if(agency.open){
                    User.query({agency:agency.agency_id,limit:9999999}, {},
                        function success(response) {
                            agency.users = response.data;
                        });
                }

            };

            init();
        }]);

