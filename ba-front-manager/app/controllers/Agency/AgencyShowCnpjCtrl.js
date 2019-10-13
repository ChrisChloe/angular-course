/**
 * Agency show controller
 */
angular
    .module('app.controllers')
    .controller('AgencyShowCnpjCtrl', ['$scope', '$state', 'appConfig', 'toastr', 'Agency',
        function ($scope, $state, appConfig, toastr, Agency) {

            var cnpj       = $state.params.cnpj;
            $scope.company = null;

            var init = function(){
                Agency.cnpj({cnpj: cnpj}, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.company = data.data;
                            toastr.success("Consulta Efetuada!");
                        }
                    });
            };

        init();
    }]);
