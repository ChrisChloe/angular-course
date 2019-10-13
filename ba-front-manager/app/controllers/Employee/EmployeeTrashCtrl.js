/**
 * Employee Trash controller
 */
angular
    .module('app.controllers')
    .controller('EmployeeTrashCtrl', ['$scope', '$state', 'appConfig', 'User', 'toastr',
        function ($scope, $state, appConfig, User, toastr) {
            var agencyId    = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = User;

            $scope.users = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);
                $scope.filterCriteria.addParam('agency', agencyId);
            };

            $scope.delete = function (user) {

                User.delete({id: user.id}, user,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', user);
                            $scope.users.splice($scope.users.indexOf(user), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            $scope.restore = function (user) {

                User.restore({id: user.id}, user,
                    function success(data) {
                        $scope.$emit('itemRestored', user);
                        if (!data.error){
                            $scope.users.splice($scope.users.indexOf(user), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

