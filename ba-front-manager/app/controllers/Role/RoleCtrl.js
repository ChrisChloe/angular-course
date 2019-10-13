/**
 * Role index controller
 */
angular
    .module('app.controllers')
    .controller('RoleCtrl', ['$scope', '$state', 'appConfig', 'Role', 'toastr',
        function ($scope, $state, appConfig, Role, toastr) {

            $scope.resource = Role;

            $scope.roles = [];

            var init = function () {
                //
            };

            $scope.inactivate = function (group) {
                var status = + !group.status;

                Role.update({id: group.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            group.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.group');
                        }
                    });
            };

            $scope.delete = function (group) {
                //@Todo:delete
            };

            $scope.trash = function (group) {
                //@Todo:trash
            };

            init();
        }]);

