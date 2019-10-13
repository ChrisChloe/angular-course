/**
 * OpIndex controller
 */
angular
    .module('app.controllers')
    .controller('OpCreateAttachmentsCtrl', ['$scope', 'appConfig', 'id', 'Op', '$uibModalInstance', 'toastr', '$window', 'parentScope', 'Upload',
        function ($scope, appConfig, id, Op, $uibModalInstance, toastr, $window, parentScope, Upload) {


            $scope.btnValue = 'Confirmar';
            $scope.savingAttachment = false;

            $scope.bank_account_id = '';
            $scope.transfer_price = 0;
            

            $scope.attachment = {
                filename: null,
                original_name: null,
                mime: "image/jpeg",
                read: 0
            };

            /**
             * Initializer
             */
            var init = function () {
                Op.get({ id: id }, function (data) {
                    $scope.op = data.data;
                });

            };


            $scope.createAttachment = function (attachment) {

                if(!attachment){
                    toastr.warning("Selecione algum arquivo");
                    return;
                }

                attachment.id = $scope.op.id;
                $scope.savingAttachment = true;

                Upload.upload({
                    url: appConfig.baseUrl + '/ops/financial/upload',
                    data: attachment
                }).then(
                    function success(resp) {
                        $scope.savingAttachment = false;
                        
                        var data = resp.data;
                        if (data.error) {
                            toastr.error('Não foi possível salvar!');
                        } else {
                            $uibModalInstance.close();
                            parentScope.refresh();
                            toastr.success("Salvo!");
                        }
                    },
                    function error(data) {
                        $scope.savingAttachment = false;

                        toastr.error('Não foi possível salvar!');
                    });

            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();

        }]);

