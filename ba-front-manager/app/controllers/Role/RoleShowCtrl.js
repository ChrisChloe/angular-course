/**
 * Role show controller
 */
angular
    .module('app.controllers')
    .controller('RoleShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Role', 'toastr',
        function ($scope, $state, appConfig, $filter, Role, toastr) {
            var roleId  = $state.params.id;
            $scope.role = null;
            $scope.title = 'Detalhes Papel';

            var init = function () {

                Role.get({id: roleId},
                    function success(data) {
                        $scope.role = data.data;
                    });

            };

            init();
        }]);
