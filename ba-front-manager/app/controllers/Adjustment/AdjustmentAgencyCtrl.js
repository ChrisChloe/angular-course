/**
 * Company index controller
 */
angular
    .module('app.controllers')
    .controller('AdjustmentAgencyCtrl', ['$scope', '$state', 'appConfig', 'Adjustment', 'Company', 'toastr',
        function ($scope, $state, appConfig, Adjustment, Company, toastr) {
            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = Adjustment;
            $scope.company        = null;

            $scope.adjustments = [];

            var init = function () {
                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('adjustable_type', 'agency');

                Company.get({id: companyId},
                    function success(data) {
                        $scope.company = data.data;
                    });
            };

            $scope.delete = function (adjustment) {
                Adjustment.delete({id: adjustment.id}, adjustment,
                    function success(data) {
                        if(!data.error){
                            $scope.adjustments.splice($scope.adjustments.indexOf(adjustment), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.trash = function (user) {
                //@todo:trash
            };

            init();
        }]);

