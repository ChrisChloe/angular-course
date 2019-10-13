/**
 * HelpDeskCtrl index controller
 */
angular
    .module('app.controllers')
    .controller('HelpDeskCtrl', ['$scope', '$cookies', '$state', 'HelpDesk', 'toastr', '$uibModalInstance',
        function ($scope, $cookies, $state, HelpDesk, toastr, $uibModalInstance) {

            $scope.sending = false;
            $scope.user = $cookies.getObject('auth_user').data;
            var token = $cookies.getObject('token').access_token;

            var init = function () { };

            
            $scope.occurrence_types = ['Problema' ,'Implementação' ,'Dúvida' ];

            $scope.submitOccurrence = function (occurrence) {

                $scope.sending = true;

                occurrence.system = "manager";
                occurrence.active_route = $state.current;
                occurrence.status = 0;

                
                HelpDesk.store(occurrence,
                    function success(res) {
                        $scope.sending = false;
                        toastr.success('Enviado com Sucesso!');
                        $uibModalInstance.dismiss('cancel');

                    },
                    function error(err){
                        $scope.sending = false;
                        toastr.warning('Erro no envio da mensagem');
                    });


            };

            init();
        }]);

