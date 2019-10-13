/**
 * Email message show create controller
 */
angular
    .module('managerApp')
    .controller('InboxMailShowCtrl', ['$scope', 'id', 'InboxMail', 'toastr', '$uibModalInstance',
        function ($scope, id, InboxMail, toastr, $uibModalInstance) {

            $scope.message = null;

            var init = function () {

                InboxMail.get({id: id},
                    function success(data) {
                        $scope.message = data.data;
                    });
                InboxMail.attachment({id: id},
                    function success(data) {
                        $scope.attachments = data.data;
                    });
            };


            $scope.close = function(){
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

