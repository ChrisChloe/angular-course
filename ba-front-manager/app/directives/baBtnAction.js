/**
 * Table Directive
 */
angular
    .module('app.directives')
    .directive('baBtnAction', ['appConfig', '$rootScope', function (appConfig, $rootScope) {

        return {
            restrict: 'AE',
            templateUrl: 'views/btn-action.html',
            scope: {
                items: '=',
                parentScope: '=',
                btnObject: '='
            },
            controller: ['$scope', '$rootScope',
                function ($scope) {
                    
                    $scope.confirmFunction = function(action) {
                        var param = $scope.btnObject;

                        $scope.parentScope[action.confirmFunction](param);
                    };
                      
            }]
        };
    }]);
