/**
 * Airport create controller
 */
angular
    .module('app.controllers')
    .controller('AirportCreateCtrl', ['$scope', '$state', 'appConfig', 'Airport', 'toastr',
        function ($scope, $state, appConfig, Airport, toastr) {
            $scope.title         = "Adicionar Aeroporto";
            $scope.airport       = null;
            $scope.subContinents = [];
            $scope.ufs           = [];

            var init = function () {
                $scope.subContinents = appConfig.subContinents;
                $scope.ufs           = appConfig.ufs;

                $scope.airport = new Airport();
                $scope.airport.belongs_to_brazil = 1;
            };

            $scope.save = function (airport) {

                airport.$save(
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Salvo!");
                            $state.go('app.airport');
                        }
                    }
                );
            };

            init();
        }]);
