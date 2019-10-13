/**
 * Airport index controller
 */
angular
    .module('app.controllers')
    .controller('AirportCtrl', ['$scope', '$state', 'appConfig', 'Airport', 'toastr',
        function ($scope, $state, appConfig, Airport, toastr) {

            $scope.resource = Airport;

            $scope.airports = [];

            var init = function () {
                $scope.$on("itemRestored", function (event, airport) {
                    $scope.airports.push(airport);
                });
            };

            $scope.trash = function (airport) {
                Airport.trash({id: airport.id}, airport,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', airport);
                            $scope.airports.splice($scope.airports.indexOf(airport), 1);
                            toastr.success("Enviado para Lixeira!");
                        }else{
                            toastr.error("Aeroporto não pode ser removido!");
                        }
                    });
            };

            init();
        }]);

