/**
 * Role edit controller
 */
angular
    .module('app.controllers')
    .controller('RoleEditCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Role', 'toastr',
        function ($scope, $state, appConfig, $filter, Role, toastr) {
            var roleId   = $state.params.id;

            $scope.title = "Editar Grupo";
            $scope.role  = null;

            var init = function () {

                Role.get({id: roleId},
                    function success(data) {
                        $scope.role = data.data;
                    });

            };

            $scope.save = function (role) {

                Role.update({id: role.id}, role,
                    function success(data) {
                        if (!data.error){
                            toastr.success("Atualizado!");
                            $state.go('app.role');
                        }
                    });
            };

            init();
        }]);
