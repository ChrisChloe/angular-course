/**
 * Download Attachment Button
 */
angular
    .module('app.directives')
    .directive('baBtnDownload', ['appConfig', 'Attachment',
        function (appConfig, Attachment) {

            return {
                restrict: "E",
                replace: true,
                template: '<button ng-click="download(attachment, viewAttachment)" class="btn btn-sm btn-success" title="Ver em nova Janela">' +
                '<i class="fa fa-eye"></i></button>',
                link: function ($scope, $element, attr) {
                    var button = $element;

                    // When the download events button
                    $scope.$on('download-start', function (event) {
                        $(button).prop('disabled', true);
                        $(button).attr('disabled', 'disabled');
                        var fa = $(button).children("i");
                        fa.attr('class', 'fa fa-spinner fa-spin');
                    });
                    $scope.$on('download-end', function (event) {
                        $(button).prop('disabled', false);
                        $(button).removeAttr('disabled');
                        var fa = $(button).children("i");
                        fa.attr('class', 'fa fa-file-pdf-o');
                    });
                },
                controller: ['$scope', '$attrs', 'toastr', '$window', function ($scope, $attrs, toastr, $window) {

                    $scope.download = function (attachment, viewAttachment) {

                        //Dispatches download start event
                        $scope.$emit('download-start');

                        Attachment.download({id: attachment.id}, {},
                            function success(response) {

                                var file = new Blob([response.data], {type: response.content_type});
                                var url = (window.URL || window.webkitURL).createObjectURL(file);

                                viewAttachment = viewAttachment || /openxml/.test(response.content_type);

                                if(viewAttachment){
                                    var a = document.createElement('a');
                                    document.getElementsByTagName("body")[0].appendChild(a);

                                    a.href = url;
                                    a.download = response.file_name;
                                    a.target = '_blank';
                                    a.click();
                                }else{
                                    $window.open(url/*, "_self"*/);
                                }

                                $scope.$emit('download-end');
                            },
                            function error() {
                                toastr.error('Não foi possível baixar!');
                                $scope.$emit('download-end');
                            }
                        );
                    };

                }]
            };
        }]);
