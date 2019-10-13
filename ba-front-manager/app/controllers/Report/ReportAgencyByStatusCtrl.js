/**
 * ReportAllCtrl controller
 */
angular
    .module('managerApp')
    .controller('ReportAgencyByStatusCtrl', ['$scope', 'toastr', 'Agency',
        function ($scope, toastr, Agency) {

            $scope.resource = Agency;
            $scope.agenciesByStatus = [];


            var init = function () {
                // Agency.agenciesByStatus(function(res){
                //     console.log(res);
                // });

            };



            init();
        }]);

