/**
 * WebSystem index controller
 */
angular
    .module('app.controllers')
    .controller('WebSystemEditCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'WebSystem', 'toastr',
        function ($scope, $rootScope, $state, appConfig, WebSystem, toastr) {

            var web_id = $state.params.id;
            $scope.filterCriteria  = appConfig.filterCriteria();
            $scope.resource        = WebSystem;
            $scope.webSystem       = new WebSystem();

            var init = function () {
                WebSystem.get({id: web_id},
                    function success(data) {
                        $scope.webSystem = data.data;
                    });
            };

            $scope.save = function (webSystem) {
                WebSystem.update({id: webSystem.id}, webSystem,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                        }
                    });
            };

            init();
        }]);

