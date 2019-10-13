/**
 * Template show controller
 */
angular
    .module('app.controllers')
    .controller('TemplateShowCtrl', ['$scope', 'templateId', 'appConfig', 'Template', '$uibModalInstance',
        function ($scope, templateId, appConfig, Template, $uibModalInstance) {

            $scope.resource = Template;
            $scope.template = [];

            var init = function () {
                Template.get({id: templateId}, function (data) {
                    $scope.template = data.data;
                });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

