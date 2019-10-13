/**
 * Email Message index controller
 */
angular
    .module('app.controllers')
    .controller('EmailMessageCtrl', ['$scope', '$state', '$location', 'appConfig', 'EmailMessage', 'toastr', '$uibModal', '$interval', 'userUtils',
        function ($scope, $state, $location, appConfig, EmailMessage, toastr, $uibModal, $interval, userUtils) {

            $scope.financeiroAddress = 'financeiro@buscaaereo.com.br';
            $scope.alteracaoAddress  = 'alteracao@buscaaereo.com.br';
            $scope.reservaAddress    = 'reserva.gps@gmail.com';
            $scope.refreshing = true;

            if (userUtils.isEmitter() || userUtils.isManager()) {

                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource = EmailMessage;
                $scope.messages = [];
                $scope.fileds   = false;

                $scope.search = {
                    search: $location.search().search
                };

                $scope.callAtInterval = function () {
                    $scope.$broadcast('onRefresh');
                };

                var init = function () {
                    $scope.filterCriteria.addParam('filed', 0);
                    $scope.filterCriteria.addParam('orderBy', "received_at");
                };

                $scope.loadFiled = function () {
                    if($scope.fileds){

                        $scope.filterCriteria.removeParam('filed');
                        $scope.filterCriteria.addParam('filed', 0);
                        $scope.fileds = false;
                        EmailMessage.get($scope.filterCriteria.getParams(), function (response) {
                            $scope.messages = response.data;
                        });

                    } else {

                        $scope.filterCriteria.removeParam('filed');
                        $scope.filterCriteria.addParam('filed', 1);

                        $scope.fileds = true;
                        EmailMessage.get($scope.filterCriteria.getParams(), function (response) {
                            $scope.messages = response.data;
                        });
                    }
                };

                $scope.attachment = function (message) {
                    var id_message = message.id;
                    EmailMessage.download({id: id_message}, {},
                        function successCallback(response) {
                            $scope.createFile(response);
                        }, function errorCallback(response) {
                            console.log('Não foi possível baixar o anexo');
                        }
                    );
                };

                $scope.filter = function (search) {
                    $scope.$broadcast('onSearch', search);
                };

                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');

                };

                $scope.directReply = function (message, address) {

                    EmailMessage.get({ id: message.id },
                        function success(response) {
                            message = response.data;

                            var msgData = {
                                subject: message.subject,
                                body:    message.text_html,
                                address: address
                            };

                            EmailMessage.reply({ id: message.reference }, msgData,
                                function success(response) {
                                    if (!response.error) {
                                        EmailMessage.filed({id: message.id}, {},
                                            function success(data) {
                                                if (!data.error) {
                                                    toastr.success("Enviado!");
                                                    $scope.refresh();
                                                }
                                            }
                                        );
                                    }
                                });
                        });

                };

                /**
                 *
                 * @param message
                 */
                $scope.show = function (message) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/email-message/show.html',
                        controller: 'EmailMessageShowCtrl',
                        size: 'lg',
                        resolve: {
                            id: message.id
                        }
                    });

                    modalInstance.result.then(function () {
                        load();
                    });
                };
                $scope.reply = function (message) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/email-message/reply.html',
                        controller: 'EmailMessageReplyCtrl',
                        size: 'lg',
                        resolve: {
                            id: message.id
                        }
                    });

                    modalInstance.result.then(function () {
                        load();
                    });
                };


                $scope.release = function (message) {
                    var id_message = message.id;
                    EmailMessage.release({id: id_message}, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Liberado!");
                                $scope.refresh();
                            }
                        }
                    );
                };

                $scope.archived = function (message) {
                    var id_message = message.id;
                    EmailMessage.arquived({id: id_message}, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Op arquivada!");
                                $scope.refreshing = true;
                                $scope.$broadcast('onRefresh');
                            }
                        }
                    );
                };

                $scope.pending = function (message) {
                    var id_message = message.id;
                    EmailMessage.pending({id: id_message}, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Op antecipada pendente!");
                                $scope.refreshing = true;
                                $scope.$broadcast('onRefresh');
                            }
                        }
                    );
                };

                $scope.filed = function (message) {
                    EmailMessage.filed({id: message.id}, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Email arquivado!");
                                $scope.refreshing = true;
                                $scope.$broadcast('onRefresh');
                            }
                        }
                    );
                };

                $scope.unarchive = function (message) {
                    EmailMessage.unarchive({id: message.id}, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Email arquivado!");
                                $scope.refreshing = true;
                                $scope.$broadcast('onRefresh');
                            }
                        }
                    );
                };

                $scope.attachment = function (message) {
                    var id_message = message.id;
                    EmailMessage.download({id: id_message}, {},
                        function successCallback(response) {
                            $scope.createFile(response);
                        }, function errorCallback(response) {
                            console.log('Não foi possível baixar o anexo');
                        }
                    );
                };

                $scope.createFile = function (data) {
                    var file = new Blob([data.string], {type: 'text/plain'}),
                        url = (window.URL || window.webkitURL).createObjectURL(file),
                        a = document.createElement('a');

                    document.getElementsByTagName("body")[0].appendChild(a);

                    a.href = url;
                    a.download = data.filename;
                    a.target = '_blank';
                    a.click();
                };

                init();
            } else {
                window.history.back();
            }
        }]);

