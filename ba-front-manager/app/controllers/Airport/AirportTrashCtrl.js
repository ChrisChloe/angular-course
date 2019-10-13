/**
 * Airport index controller
 */
angular
    .module('app.controllers')
    .controller('AirportTrashCtrl', ['$scope', '$state', 'appConfig', 'Airport', 'toastr',
        function ($scope, $state, appConfig, Airport, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = Airport;

            $scope.airports = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, airport) {
                    $scope.airports.push(airport);
                });
            };

            $scope.delete = function (airport) {
                Airport.delete({id: airport.id}, airport,
                    function success(data) {
                        if (!data.error){
                            $scope.airports.splice($scope.airports.indexOf(airport), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.restore = function (airport) {

                Airport.restore({id: airport.id}, airport,
                    function success(data) {
                        $scope.$emit('itemRestored', airport);
                        if (!data.error){
                            $scope.airports.splice($scope.airports.indexOf(airport), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

