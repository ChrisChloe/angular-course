/**
 * Agency show controller
 */
angular
    .module('app.controllers')
    .controller('AgencyShowCpfCtrl', ['$scope', '$state', 'appConfig', 'toastr', 'Agency',
        function ($scope, $state, appConfig, toastr, Agency) {

            var cpf     = $state.params.cpf;
            $scope.data = null;

            var init = function(){
                Agency.cpf({cpf: cpf}, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.person = data.data;
                            toastr.success("Consulta Efetuada!");
                        }
                    });
            };

            init();
        }]);
