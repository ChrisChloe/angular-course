/**
 * Group create controller
 */
angular
    .module('app.controllers')
    .controller('GroupCreateCtrl', ['$scope', '$state', 'appConfig', 'Group', 'toastr',
        function ($scope, $state, appConfig, Group, toastr) {
            $scope.title = "Adicionar Grupo";
            $scope.group = null;

            var init = function () {
                $scope.group = new Group();
            };

            $scope.save = function (group) {
                group.$save(
                    function success(data) {
                        if (!data.error) {
                            $state.go('app.group-edit', data.data);
                            toastr.success("Agora você pode adicionar acrescimos e descontos!");
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            init();
        }]);
