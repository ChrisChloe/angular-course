/**
 * EmailConfig index controller
 */
angular
    .module('app.controllers')
    .controller('EmailConfigCtrl', ['$scope', '$state', 'appConfig', 'EmailConfig', 'toastr',
        function ($scope, $state, appConfig, EmailConfig, toastr) {

            $scope.resource = EmailConfig;

            $scope.configs = [];

            var init = function () {
                $scope.$on("itemRestored", function (event, config) {
                    $scope.configs.push(config);
                });
            };

            $scope.inactivate = function (config) {
                var status = + !config.status;

                EmailConfig.update({id: config.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            config.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.config');
                        }
                    });
            };

            $scope.trash = function (config) {
                EmailConfig.delete({id: config.id}, config,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', config);
                            $scope.configs.splice($scope.configs.indexOf(config), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            init();
        }]);

