/**
 * User Trash controller
 */
angular
    .module('app.controllers')
    .controller('UserTrashCtrl', ['$scope', 'appConfig', 'User', 'toastr',
        function ($scope, appConfig, User, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = User;

            $scope.users = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);
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

            $scope.thisScope = $scope;
            $scope.userTrashTableActions = [
                { isSubmenu: false, isDynamic: false, title: 'Detalhes', icon: 'fa-search', btnColor: 'btn-success', functionCall: 'app.user-show', fontColor: '#fff' },
                { isSubmenu: false, isDynamic: false, title: 'Editar', icon: 'fa-edit', btnColor: 'btn-info', functionCall: 'app.user-edit', fontColor: '#fff' },
                { isSubmenu: true, isDynamic: false, title: 'Restaurar', icon: 'fa-recycle', btnColor: 'btn-success', fontColor: '#fff', modalTitle: 'O usuário será restaurado, tem certeza?', confirmTitle: 'Restaurar?', confirmColor: 'btn-success', confirmFunction: 'restore' }
            ];


            init();
        }]);

