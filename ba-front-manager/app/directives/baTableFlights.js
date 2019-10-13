/**
 * Table Flight List
 */
angular
    .module('app.directives')
    .directive('baTableFlights', function () {

        return {
            templateUrl: 'views/search/tables/flights.html',
            restrict: 'AE',
            transclude: true,
            replace: true,
            scope: {
                flights: '=',
            },
            link: function (scope, element, attrs) {

                //scope.flights
            }
        };
});