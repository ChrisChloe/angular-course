/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('EmissionStatusCtrl', ['$scope', 'emission', 'Emission', 'toastr', '$uibModalInstance',
        function ($scope, emission, Emission, toastr, $uibModalInstance) {

            $scope.emission = emission;

            var init = function () {

            };

            $scope.save = function (emission) {

                Emission.status({id: emission.id}, emission,
                    function success(data) {
                        if (!data.error) {
                            //Return To Add List
                            $uibModalInstance.close(data.data);
                            //$uibModalInstance.dismiss('cancel');
                            toastr.success("Salvo!");
                        }
                    });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

