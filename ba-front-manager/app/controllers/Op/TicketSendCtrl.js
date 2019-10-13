/**
 * TicketSendCtrl
 */
angular
    .module('managerApp')
    .controller('TicketSendCtrl', ['$scope', '$state', 'emission', 'user', 'load', 'appConfig', 'Op', 'toastr', '$uibModalInstance', 'Emission', 'userUtils', '$location',
        function ($scope, $state, emission, user, load, appConfig, Op, toastr, $uibModalInstance, Emission, userUtils, $location) {
            if(userUtils.isManager() || userUtils.isEmitter()) {
                $scope.emission = emission;

                $scope.email = {
                    to: user.email,
                    cc: [],
                    bcc: [],
                    sending: false
                };

                var init = function () {

                };

                $scope.addCopy = function () {
                    $scope.email.cc.push({value: ''});
                };

                $scope.removeCopy = function (email) {
                    $scope.email.cc.splice($scope.email.cc.indexOf(email), 1);
                };

                $scope.addBlindCopy = function () {
                    $scope.email.bcc.push({value: ''});
                };

                $scope.removeBlindCopy = function (email) {
                    $scope.email.bcc.splice($scope.email.bcc.indexOf(email), 1);
                };

                $scope.send = function (email) {
                    emission.sending = true;
                    email.sending = true;
                    var cc = email.cc.map(function (item) {
                        return item.value;
                    });
                    var bcc = email.bcc.map(function (item) {
                        return item.value;
                    });

                    toastr.info("Bilhete está sendo enviado");

                    Emission.sendTicket({id: emission.id}, {to: email.to, cc: cc, bcc: bcc},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Bilhete enviado!");
                            }
                            emission.sending = false;
                            email.sending = false;

                            load.func();
                        });

                    $uibModalInstance.close();
                };

            $scope.close = function(){
                $uibModalInstance.close();
            };

            init();
           }else $location.path( "/#" );

        }]);

