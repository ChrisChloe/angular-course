/**
 * AdjustmentGroup index controller
 */
angular
    .module('app.controllers')
    .controller('AdjustmentGroupCtrl', ['$scope', '$state', 'appConfig', 'Adjustment', 'toastr',
        function ($scope, $state, appConfig, Adjustment, toastr) {
            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Adjustment;

            $scope.adjustments = [];

            var init = function () {
                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('adjustable_type', 'group');
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

