/**
 *
 */
angular.module('app.controllers')
    .controller('LogoutCtrl',['$state', '$http', '$cookies', 'OAuth', 'appConfig','User','$scope',
            function ($state, $http, $cookies, OAuth, appConfig, User,$scope) {
                $scope.resource = User;

                if (OAuth.isAuthenticated()) {
                    User.logout({logout:'sair'},
                        function success(data) {
                            $cookies.remove('auth_user');
                            $cookies.remove('token');
                        },
                        function error() {
                            $cookies.remove('auth_user');
                            $cookies.remove('token');
                        });
                }

                $state.transitionTo("appSimple.login");
            }]);

 