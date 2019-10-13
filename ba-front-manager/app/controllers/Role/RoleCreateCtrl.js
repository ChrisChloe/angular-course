/**
 * Role create controller
 */
angular
    .module('app.controllers')
    .controller('RoleCreateCtrl', ['$scope', '$state', 'appConfig', 'Role', 'toastr',
        function ($scope, $state, appConfig, Role, toastr) {
            $scope.title = "Adicionar Grupo";
            $scope.role  = null;

            var init = function () {
                $scope.role = new Role();
            };

            $scope.save = function (role) {
                role.$save(
                    function success(data) {
                        if (!data.error) {
                            $state.go('app.role-edit', data);
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            init();
        }]);
