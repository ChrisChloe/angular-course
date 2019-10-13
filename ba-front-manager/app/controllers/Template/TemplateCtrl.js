/**
 * Template index controller
 */
angular
    .module('app.controllers')
    .controller('TemplateCtrl', ['$scope', '$state', 'appConfig', 'Template', '$uibModal',
        function ($scope, $state, appConfig, Template, $uibModal) {

            $scope.resource = Template;

            $scope.templates = [];

            var init = function () {
                //
            };

            $scope.delete = function (template) {
                Template.delete({id: template.id}, template,
                    function success(data) {
                        if (!data.error){
                            $scope.templates.splice($scope.templates.indexOf(template), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.showTemplate = function (template) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationEnabled,
                    templateUrl: 'views/template/show.html',
                    controller: 'TemplateShowCtrl',
                    size: 'lg',
                    resolve: {
                        templateId: template.id
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });

            }

            init();
        }]);

