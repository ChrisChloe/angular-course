/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('CheckInProblemCtrl', ['$scope', 'emission', 'Emission', 'toastr', '$uibModalInstance',
        function ($scope, emission, Emission, toastr, $uibModalInstance) {

            $scope.problem = {
                description: ''
            };

            $scope.sending = false;

            var init = function () {
            };

            $scope.save = function (problem) {
                $scope.sending = true;

                Emission.addProblem({id: emission.id}, problem,
                    function success(response) {
                        if (!response.error) {
                            //Return To Add List
                            $uibModalInstance.close(response);
                            toastr.success("Salvo!");
                            $scope.sending = false;
                        }
                    }
                );
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

