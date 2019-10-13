/**
 * User show controller
 */
angular
    .module('app.controllers')
    .controller('UserShowCtrl', ['$scope', '$state', 'User', '$window', 'toastr', '$cookies',
        function ($scope, $state, User, $window, toastr, $cookies) {
            var userId = $state.params.id;

            $scope.user = null;
            $scope.editUser = $cookies.getObject('auth_user');

            $scope.toEditBranch = false;

            var init = function () {
                $scope.user = User.get({ id: userId },
                    function success(response) {
                        $scope.user = response.data;
                    });
            };

            $scope.toEdit = function () { $scope.toEditBranch = true; }

            $scope.updateBranch = function (branch) {

                if (branch.length >= 3) {


                    if(!parseInt(branch)){
                        toastr.error('O Ramal não pode conter letras');
                        return;
                    }


                    $scope.editUser.data.branch = parseInt(branch);


                    User.update({ id: $scope.editUser.data.id }, $scope.editUser.data,
                        function success(data) {

                            $cookies.remove('auth_user');
                            $cookies.putObject('auth_user', $scope.editUser);
                            toastr.success('Ramal atualizado com Sucesso.');

                            $window.location.reload();


                        });

                } else {
                    toastr.error('O Ramal precisa ter pelo menos 3 digitos');
                }
            };


            init();
        }]);
