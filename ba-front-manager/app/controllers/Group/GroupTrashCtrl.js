/**
 * Group index controller
 */
angular
    .module('app.controllers')
    .controller('GroupTrashCtrl', ['$scope', '$state', 'appConfig', 'Group', 'toastr',
        function ($scope, $state, appConfig, Group, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Group;

            $scope.groups = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, group) {
                    $scope.groups.push(group);
                });
            };

            $scope.delete = function (group) {
                Group.delete({id: group.id}, group,
                    function success(data) {
                        if (!data.error){
                            $scope.groups.splice($scope.groups.indexOf(group), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.restore = function (group) {

                Group.restore({id: group.id}, group,
                    function success(data) {
                        $scope.$emit('itemRestored', group);
                        if (!data.error){
                            $scope.groups.splice($scope.groups.indexOf(group), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

