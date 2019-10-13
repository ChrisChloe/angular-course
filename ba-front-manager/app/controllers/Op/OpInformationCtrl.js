/**
 * Email message show create controller
 */
angular
    .module('managerApp')
    .controller('OpInformationCtrl', ['$scope', 'op', 'toastr', '$uibModalInstance',
        function ($scope, op, toastr, $uibModalInstance) {

            $scope.information = op.information;
            $scope.op_id       = op.id;
            $scope.close = function(){
                $uibModalInstance.dismiss('cancel');
            };

        }]);

