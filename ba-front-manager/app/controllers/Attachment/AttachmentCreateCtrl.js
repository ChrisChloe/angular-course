/**
 * Attachment create controller
 */
angular
    .module('app.controllers')
    .controller('AttachmentCreateCtrl', ['$scope', '$uibModalInstance', 'Attachment', 'Upload', 'agency', 'toastr', 'appConfig',
        function ($scope, $uibModalInstance, Attachment, Upload, agency, toastr, appConfig) {
            $scope.attachment  = null;
            $scope.progressbar = 0;

            var init = function () {
                $scope.attachment = new Attachment();
                $scope.attachment.agency = agency;
            };


            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.save = function (attachment) {

                Upload.upload({
                    url: appConfig.baseUrl + '/attachments',
                    data: attachment
                }).then(
                    function success(resp) {
                        var data = resp.data;
                        if (data.error) {
                            toastr.error('Não foi possível salvar!');
                            $scope.progressbar = 0;
                        } else {
                            //Return To Add List
                            $uibModalInstance.close(data.data);
                            toastr.success("Salvo!");
                        }
                    },
                    function error(data) {
                        toastr.error('Não foi possível salvar!');
                    },
                    function progress(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.progressbar = progressPercentage;
                    });

            };

            $scope.fileSelected = function (attachment) {
                if (!attachment.description && attachment.file) {
                    attachment.description = attachment.file.name.replace(/[-_]/g, " ");
                }
            };

            init();
        }]);
