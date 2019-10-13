/**
 * Email message show create controller
 */
angular
    .module('managerApp')
    .controller('EmailMessageShowCtrl', ['$scope', 'id', 'EmailMessage', 'toastr', '$uibModalInstance',
        function ($scope, id, EmailMessage, toastr, $uibModalInstance) {

            $scope.message = null;

            var init = function () {

                EmailMessage.get({id: id},
                    function success(data) {
                        $scope.message = data.data;
                        $scope.linkAddress = '#/email-message?search='+$scope.message.from_address;
                    });
                EmailMessage.attachment({id: id},
                    function success(data) {
                        $scope.attachments = data.data;
                    });

            };

            $scope.close = function(){
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

