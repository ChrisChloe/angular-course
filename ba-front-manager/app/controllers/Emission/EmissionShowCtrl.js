/**
 * Emission show controller
 */
angular
    .module('app.controllers')
    .controller('EmissionShowCtrl', ['$scope', '$state', '$filter', 'Emission',
        function ($scope, $state, $filter, Emission) {
            $scope.title    = "Detalhes Emissão";
            $scope.emission = null;

            var init = function () {
                Emission.get({id: $state.params.id},
                    function success(data) {
                        $scope.emission = data.data;
                    });
            };

            init();
        }]);
