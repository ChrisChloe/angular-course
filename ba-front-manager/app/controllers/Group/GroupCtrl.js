/**
 * Group index controller
 */
angular
    .module('app.controllers')
    .controller('GroupCtrl', ['$scope', '$state', 'appConfig', 'Group', 'toastr',
        function ($scope, $state, appConfig, Group, toastr) {

            $scope.resource = Group;

            $scope.groups = [];

            var init = function () {
                $scope.$on("itemRestored", function (event, group) {
                    $scope.groups.push(group);
                });
            };

            $scope.inactivate = function (group) {
                var status = + !group.status;

                Group.update({id: group.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            group.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.group');
                        }
                    });
            };

            $scope.trash = function (group) {

                Group.trash({id: group.id}, group,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', group);
                            $scope.groups.splice($scope.groups.indexOf(group), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            init();
        }]);

