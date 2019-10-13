/**
 * Airport show controller
 */
angular
    .module('app.controllers')
    .controller('AirportShowCtrl', ['$scope', '$state', '$filter', 'appConfig', 'Airport',
        function ($scope, $state, $filter, appConfig, Airport) {
            $scope.title         = "Detalhes Aeroporto";
            $scope.airport       = null;

            var init = function () {

                Airport.get({id: $state.params.id}, function (data) {
                    $scope.airport = data.data;
                });
            };

            init();
        }]);
