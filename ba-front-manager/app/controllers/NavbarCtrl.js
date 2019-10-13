/**
 *
 */
angular
    .module('app.controllers')
    .controller('NavbarCtrl', ['$scope', '$rootScope', '$cookies', 'userUtils',
            function ($scope, $rootScope, $cookies, userUtils) {
                $scope.user = userUtils.getUser();

                $scope.isExecutive = $rootScope.isExecutive();

            }]);

 