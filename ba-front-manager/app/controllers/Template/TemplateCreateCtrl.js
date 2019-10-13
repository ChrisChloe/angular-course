/**
 * Template create controller
 */
angular
    .module('app.controllers')
    .controller('TemplateCreateCtrl', ['$scope', '$state', 'appConfig', 'Template', 'toastr',
        function ($scope, $state, appConfig, Template, toastr) {
            $scope.title = "Adicionar Template";
            $scope.template = null;

            var templateBody = null;

            var init = function () {
                $scope.template = new Template();
                $scope.template.status = 1;
                
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
                template.body = tinymce.get("editorTemplateCreate").getContent();
                template.$save(
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Salvo!");
                            $state.go('app.template');
                        }
                    }
                );
            };

            $scope.getCouponExpiration = function (days) {
                return moment().add(days || 0, 'days').endOf('day').format('DD/MM/YYYY HH:mm:ss')
            };

            init();
        }]);
