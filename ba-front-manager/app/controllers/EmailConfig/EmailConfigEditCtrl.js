/**
 * EmailConfig edit controller
 */
angular
    .module('app.controllers')
    .controller('EmailConfigEditCtrl', ['$scope', '$state', 'appConfig', '$filter', 'EmailConfig', 'toastr',
        function ($scope, $state, appConfig, $filter, EmailConfig, toastr) {
            var configId  = $state.params.id;

            $scope.title  = "Editar Configuração";
            $scope.config = null;

            var init = function () {
                EmailConfig.get({id: configId},
                    function success(data) {
                        $scope.config = data.data;
                    });
            };

            $scope.save = function (config) {

                EmailConfig.update({id: config.id}, config,
                    function success(data) {
                        if (!data.error){
                            toastr.success("Atualizado!");
                            $state.go('app.mail-config');
                        }
                    });
            };

            init();
        }]);
