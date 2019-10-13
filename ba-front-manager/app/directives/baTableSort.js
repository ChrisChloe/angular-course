/**
 * Table sort
 */
angular
    .module('app.directives')
    .directive('baTableSort', function () {

        return {
            templateUrl: 'views/table-sort.html',
            restrict: 'AE',
            transclude: true,
            replace: true,
            require: "?^baTable",
            scope: {
                sortedby: '=baTableSortDir',
                orderby: '=baTableSortBy',
                sortvalue: '@baTableSortValue',
                disabledPagination: '=baTableDisabledPagination'
            },
            link: function (scope, element, attrs) {
                scope.textAlign = scope.$parent.$parent.textAlign;
                scope.sort = function () {
                    if (scope.orderby == scope.sortvalue) {
                        scope.sortedby = scope.sortedby == 'asc' ? 'desc' : 'asc';
                    } else {
                        scope.orderby = scope.sortvalue;
                        scope.sortedby = 'desc';
                    }

                    scope.$emit('onSort', scope.orderby, scope.sortedby);
                };
            }
        };
});