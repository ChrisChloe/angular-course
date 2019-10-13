/**
 * WebSystem index controller
 */
angular
    .module('app.controllers')
    .controller('WebSystemCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'WebSystem', 'toastr',
        function ($scope, $rootScope, $state, appConfig, WebSystem, toastr) {

            $scope.filterCriteria  = appConfig.filterCriteria();
            $scope.resource        = WebSystem;
            $scope.webSystem       = new WebSystem();
            $scope.webSystems      = [];
          
            var init = function () {

            };

            //webSystems Add
            $scope.save = function (webSystem) {

                webSystem.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.webSystems.push(data.data);
                            webSystem = new WebSystem();
                            $scope.webSystem = webSystem;
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            init();
        }]);

