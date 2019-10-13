/**
 * Template edit controller
 */
angular
    .module('app.controllers')
    .controller('TemplateEditCtrl', ['$scope', '$state', '$filter', 'Template', 'toastr',
        function ($scope, $state, $filter, Template, toastr) {
            $scope.title = "Editar Template";
            $scope.template  = null;

            var init = function () {
                Template.get({id: $state.params.id}, function (data) {
                    $scope.template = data.data;
                });

                var interval = setInterval(function(){
                    tinymce.remove();
                    tinymce.EditorManager.editors = []; 
                    tinymce.init({
                        selector: '#editorTemplateCreate',
                        theme: 'modern',
                        image_advtab: true,
                        plugins: [
                            'advlist autolink lists link charmap preview hr anchor pagebreak',
                            'searchreplace wordcount visualblocks visualchars code fullscreen',
                            'insertdatetime nonbreaking save contextmenu directionality',
                            'template paste textcolor colorpicker textpattern codesample toc noneditable'
                        ],
                        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | preview | forecolor backcolor emoticons | codesample',
                        setup : function(ed) {
                            clearInterval(interval);
                        }
                    });   
                }, 1000);
            };

            $scope.save = function (template) {

                delete template.created_by;

                template.body = tinymce.get("editorTemplateCreate").getContent();

                Template.update({id: template.id}, template,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.template');
                        }
                    });
            };

            $scope.getCouponExpiration = function (days) {
                return moment().add(days || 0, 'days').endOf('day').format('DD/MM/YYYY HH:mm:ss')
            };

            init();
        }]);
