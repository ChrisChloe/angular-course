/**
 * Email message Reply controller
 */
angular
    .module('managerApp')
    .controller('EmailMessageReplyCtrl', ['$scope', 'id', 'EmailMessage','appConfig','toastr', '$uibModalInstance',
        function ($scope, id, EmailMessage, appConfig, toastr, $uibModalInstance) {

            $scope.message = null;
            $scope.reply = null;
            $scope.replys = appConfig.Replys;

            var init = function () {

                EmailMessage.get({id: id},
                    function success(data) {
                        $scope.message     = data.data;
                        $scope.message.body= $scope.message.text_html;

                    });
            };
            $scope.financeiroAddres ='financeiro@buscaaereo.com.br';
            $scope.alteracaoAddres  ='alteracao@buscaaereo.com.br';
            $scope.rafaelaAddres    ='rafaela.melo@buscaaereo.com.br';
            $scope.tatianeAddres    ='tatiane.chaves@psvturismo.com.br';


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
                EmailMessage.reply({id: message.reference}, data,
                    function success(data) {

                        if (!data.error) {

                            toastr.success("Enviado!");
                            $uibModalInstance.dismiss('cancel');
                        }else{
                            toastr.error(data.message);
                        }
                    });
            };

            init();
        }]);

