/**
 * ExistingAgencyModalCtrl index controller
 */
angular
    .module('app.controllers')
    .controller('ExistingAgencyModalCtrl', ['$scope', '$state', 'toastr', 'agency', '$uibModalInstance',
        function ($scope, $state, toastr, agency, $uibModalInstance) {

            $scope.agency = agency;

            var init = function () {}

            $scope.closeModal = function () {
                $uibModalInstance.dismiss('cancel');
            }

            init();

        }]);

