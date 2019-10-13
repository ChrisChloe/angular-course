/**
 * ReportAgencyCtrl controller
 */
angular
    .module('managerApp')
    .controller('ReportAgencyNorthCtrl', ['$scope', '$cookies', 'Report', 'User', 'appConfig', 'toastr',
        function ($scope, $cookies, Report, User, appConfig, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Report;
            $scope.resourceFunction = "agency";

            $scope.reports = [];

            var init = function () {
                $scope.filterCriteria.addParam('region', 'norte');
            };

            $scope.filter = function(search){
                search.region = 'norte';
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

