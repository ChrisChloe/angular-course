/**
 * Download Emission Ticket Button
 */
angular
    .module('app.directives')
    .directive('baBtnDownloadTicket', ['appConfig', 'Emission',
        function (appConfig, Emission) {

            return {
                restrict: "E",
                replace: true,
                template: '<button ng-click="download(emission, view)" class="btn btn-info btn-xs" title="Ver Bilhete">' +
                '<i class="fa fa-eye"></i> Bilhete</button>',
                link: function ($scope, $element, attr) {
                    var button = $element;

                    // When the download events button
                    $scope.$on('download-start-ticket', function (event) {
                        $(button).prop('disabled', true);
                        $(button).attr('disabled', 'disabled');
                        var fa = $(button).children("i");
                        fa.attr('class', 'fa fa-spinner fa-spin');
                    });
                    $scope.$on('download-end-ticket', function (event) {
                        $(button).prop('disabled', false);
                        $(button).removeAttr('disabled');
                        var fa = $(button).children("i");
                        fa.attr('class', 'fa fa-file-pdf-o');
                    });
                },
                controller: ['$scope', '$attrs', 'toastr', '$window', function ($scope, $attrs, toastr, $window) {

                    $scope.download = function (emission, view) {

                        //Dispatches download start event
                        $scope.$emit('download-start-ticket');

                        Emission.ticket({id: emission.id}, {},
                            function success(response) {

                                var file = new Blob([response.data], {type: response.content_type});
                                var url = (window.URL || window.webkitURL).createObjectURL(file);

                                if(view){
                                    var a = document.createElement('a');
                                    document.getElementsByTagName("body")[0].appendChild(a);

                                    a.href = url;
                                    a.download = response.file_name;
                                    a.target = '_blank';
                                    a.click();
                                }else{
                                    $window.open(url/*, "_self"*/);
                                }

                                $scope.$emit('download-end-ticket');
                            },
                            function error() {
                                toastr.error('Não foi possível baixar!');
                                $scope.$emit('download-end-ticket');
                            }
                        );
                    };

                }]
            };
        }]);
