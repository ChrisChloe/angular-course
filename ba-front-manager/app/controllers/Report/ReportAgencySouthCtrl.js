/**
 * ReportAgencyCtrl controller
 */
angular
    .module('managerApp')
    .controller('ReportAgencySouthCtrl', ['$scope', '$cookies', 'Report', 'User', 'appConfig', 'toastr',
        function ($scope, $cookies, Report, User, appConfig, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Report;
            $scope.resourceFunction = "agency";

            $scope.reports = [];

            var init = function () {
                $scope.filterCriteria.addParam('region', 'sul');
            };

            $scope.filter = function(search){
                search.region = 'sul';
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

