/**
 * Group edit controller
 */
angular
    .module('app.controllers')
    .controller('GroupEditCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Group', 'Company', 'Adjustment', 'toastr',
        function ($scope, $state, appConfig, $filter, Group, Company, Adjustment, toastr) {
            var groupId  = $state.params.id;
            $scope.title = "Editar Grupo E Preços";
            $scope.group = null;

            $scope.adjustments     = [];
            $scope.adjustment      = null;
            $scope.adjustmentTypes = [];
            $scope.fareTypes       = [];
            $scope.calculationTypes = [];
            $scope.applicationTypes = [];
            $scope.flightTypes = [];
            

            var init = function () {
                // $scope.adjustment = new Adjustment();
                // $scope.adjustmentTypes = appConfig.adjustmentTypes;
                // $scope.fareTypes = appConfig.fareTypes;
                // $scope.calculationTypes = appConfig.calculationTypes;
                // $scope.applicationTypes = appConfig.applicationTypes;
                // $scope.flightTypes = appConfig.flightTypes;
                

                Group.get({id: groupId},
                    function success(data) {
                        $scope.group = data.data;
                    });

                Company.query({},
                    function success(data) {
                        $scope.companies = data.data;
                    });

                listAdjustments();

            };

            $scope.adjustment = new Adjustment();
            $scope.adjustmentTypes = appConfig.adjustmentTypes;
            $scope.fareTypes = appConfig.fareTypes;
            $scope.calculationTypes = appConfig.calculationTypes;
            $scope.applicationTypes = appConfig.applicationTypes;
            $scope.flightTypes = appConfig.flightTypes;

            var listAdjustments = function(){
                Adjustment.query({search: "group:" +  groupId},
                    function success(data) {
                        $scope.adjustments = data.data;
                    });
            };

            $scope.save = function (group) {

                Group.update({id: group.id}, group,
                    function success(data) {
                        if (!data.error){
                            toastr.success("Atualizado!");
                            $state.go('app.group');
                        }
                    });
            };

            $scope.saveAdjustment = function (adjustment) {

                Adjustment.update({id: adjustment.id}, adjustment,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                        }
                    });
            };

            $scope.addAdjustment = function (adjustment) {
                adjustment.adjustable_type = 'group';
                adjustment.adjustable_id   = groupId;

                adjustment.$save(
                    function success(data) {
                        if (!data.error) {
                            //$scope.adjustments.push(adjustment);
                            listAdjustments();
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.removeAdjustment = function (adjustment) {
                Adjustment.delete({id: adjustment.id},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Removido!");
                            $scope.adjustments.splice($scope.adjustments.indexOf(adjustment), 1);
                        }
                    });
            };

            init();
        }]);
