/**
 * Credits Show controller
 */
angular
    .module('managerApp')
    .controller('AgencyCreditsShowCtrl', ['$scope', 'id', 'Credit', 'toastr', '$uibModalInstance','appConfig',
        function ($scope, id, Credit, toastr, $uibModalInstance, appConfig) {

            var agencyId = id;
            $scope.credits = [];
            $scope.resourceCredit = Credit;


            var init = function () {
                $scope.filterCriteriaCredit = appConfig.filterCriteria();
                $scope.filterCriteriaCredit.addParam('agency_id', agencyId);
            };

            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

             $scope.close = function(){
                 $uibModalInstance.dismiss('cancel');
             };

            init();
        }]);

