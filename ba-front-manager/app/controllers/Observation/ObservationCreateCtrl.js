/**
 * Observation create controller
 */
angular
    .module('app.controllers')
    .controller('ObservationCreateCtrl', ['$scope', '$uibModalInstance', 'Observation', 'agency', 'toastr',
        function ($scope, $uibModalInstance, Observation, agency, toastr) {
        $scope.observation = null;

        var init = function(){
            $scope.observation = new Observation();
            $scope.observation.agency = agency;
        };

        $scope.save = function (observation) {
            observation.$save(
                function (data) {
                    if (!data.error) {
                        //Return To Add List
                        $uibModalInstance.close(data.data);
                        toastr.success("Salvo!");
                    }
                }
            );
        };

        init();
    }]);
