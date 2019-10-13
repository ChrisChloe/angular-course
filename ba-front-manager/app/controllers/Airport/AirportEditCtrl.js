/**
 * Airport edit controller
 */
angular
    .module('app.controllers')
    .controller('AirportEditCtrl', ['$scope', '$state', '$filter', 'appConfig', 'Airport', 'toastr',
        function ($scope, $state, $filter, appConfig, Airport, toastr) {
            $scope.title         = "Editar Aeroporto";
            $scope.airport       = null;
            $scope.subContinents = [];
            $scope.ufs           = [];

            var init = function () {
                $scope.subContinents = appConfig.subContinents;
                $scope.ufs = appConfig.ufs;

                Airport.get({id: $state.params.id}, function (data) {
                    $scope.airport = data.data;
                });
            };

            $scope.save = function (airport) {

                Airport.update({id: airport.id}, airport,
                    function (data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.airport');
                        }
                    });
            };

            init();
        }]);
