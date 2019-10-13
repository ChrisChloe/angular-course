/**
 * Group show controller
 */
angular
    .module('app.controllers')
    .controller('GroupShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Group', 'toastr',
        function ($scope, $state, appConfig, $filter, Group, toastr) {
            var groupId  = $state.params.id;
            $scope.group = null;
            $scope.title = 'Detalhes Grupo';

            var init = function () {

                Group.get({id: groupId},
                    function success(data) {
                        $scope.group = data.data;
                    });

            };

            init();
        }]);
