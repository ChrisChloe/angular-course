/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('ReembolsoStatusCtrl', ['$scope', 'refund', 'Refund', 'toastr', '$uibModalInstance',
        function ($scope, refund, Refund, toastr, $uibModalInstance) {

            $scope.refund = refund;

            var init = function () {

            };

            $scope.save = function (refund) {

                Refund.status({id: refund.id}, refund,
                    function success(data) {
                        if (!data.error) {
                            //Return To Add List
                            $uibModalInstance.close(data.data);
                            //$uibModalInstance.dismiss('cancel');
                            toastr.success("Salvo!");
                            window.location.reload();
                        }
                        else{
                            toastr.warning(data.message);
                        }
                    });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

