/**
 * controller
 */
angular
    .module('managerApp')
    .controller('ContactConfirmedDescCtrl', ['$scope', 'contact', 'update', 'Contact', 'toastr', '$uibModalInstance',
        function ($scope, contact, update, Contact, toastr, $uibModalInstance) {

            $scope.action = "Confirmar";
            $scope.name = contact.name;
            $scope.observation = contact.observation;

            var init = function () {

            };

            $scope.confirm = function () {
                Contact.updateStatus({id: contact.id}, {status: 1, observation: $scope.observation},
                    function success(response) {
                        if (!response.error) {
                            $uibModalInstance.dismiss('cancel');
                            toastr.success("Confirmado!");
                            update.refresh();
                        }
                    });
            };

            $scope.close = function(){
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

