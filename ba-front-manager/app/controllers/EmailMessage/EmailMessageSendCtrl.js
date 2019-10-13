/**
 * Email message Reply controller
 */
angular
    .module('managerApp')
    .controller('EmailMessageSendCtrl', ['$scope','EmailMessage','appConfig','toastr', '$uibModalInstance',
        function ($scope, EmailMessage, appConfig, toastr, $uibModalInstance) {

            $scope.message = null;
            $scope.reply = null;
            $scope.replys = appConfig.Replys;

            $scope.change = function (reply) {
                $scope.message.body = reply.body;
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.save = function (message) {
                data = {
                    'subject': message.subject,
                    'body': message.body,
                    'address': message.address
                };
                EmailMessage.send({}, data,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Enviado!");
                            $uibModalInstance.dismiss('cancel');
                        }else{
                            toastr.error(data.message);
                        }
                    });
            };

        }]);

