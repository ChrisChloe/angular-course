/**
 *
 */
angular
    .module('app.controllers')
    .controller('ClickToCallModalCtrl', ['$scope', 'rootScope', 'User', '$uibModalInstance', '$cookies', 'toastr',
        function ($scope, rootScope, User, $uibModalInstance, $cookies, toastr) {


            var init = function () {
                $scope.branch = '';
            };

            $scope.updateUser = function () {
                if ($scope.branch.length >= 3) {

                    $scope.user = $cookies.getObject('auth_user');

                    $scope.user.data.branch = parseInt($scope.branch);


                    User.update({ id: $scope.user.data.id }, $scope.user.data,
                        function success(data) {

                            $cookies.remove('auth_user');

                            $cookies.putObject('auth_user', $scope.user);

                            rootScope.call();

                            $scope.close();

                        });

                } else {
                    toastr.error('O Ramal precisa ter pelo menos 3 digitos');
                }
            };

            // $scope.change = function(){
            //     console.log($scope.branch);
            // }


            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();

        }]);

