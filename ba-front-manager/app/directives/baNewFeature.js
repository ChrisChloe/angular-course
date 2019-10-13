
/**
 * baNewFeature
 */
angular
    .module('app.directives')
    .directive('baNewFeature', [function () {

        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<span class="new-feature" ng-if="show">{{ message ? message : "NOVO"}}</span>',
            scope: {
                expires: '@',
                message: '@',
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                    var expires = moment($scope.expires);
                    var isFuture = expires.isAfter(moment());
                    $scope.show = isFuture;
                }
            ]
        };
}]);




