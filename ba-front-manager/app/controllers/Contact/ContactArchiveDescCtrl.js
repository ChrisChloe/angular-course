/**
 * controller
 */
angular
    .module('managerApp')
    .controller('ContactArchiveDescCtrl', ['$scope', 'contact', 'update', 'Contact', 'toastr', '$uibModalInstance',
        function ($scope, contact, update, Contact, toastr, $uibModalInstance) {

            $scope.action = "Arquivar";
            $scope.name = contact.name;
            $scope.observation = contact.observation;

            var init = function () {

            };

            $scope.archive = function () {
                Contact.updateStatus({id: contact.id}, {status: 2, observation: $scope.observation},
                    function success(response) {
                        if (!response.error) {
                            $uibModalInstance.dismiss('cancel');
                            toastr.success("Arquivado!");
                            update.refresh();
                            
                        }
                    });
            };

            $scope.close = function(){
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

