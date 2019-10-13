/**
 * Email Message index controller
 */
angular
    .module('app.controllers')
    .controller('EmailMessageFiled', ['$scope', '$state', '$location', 'appConfig', 'EmailMessage', 'toastr', '$uibModal','$interval','userUtils',
        function ($scope, $state, $location, appConfig, EmailMessage, toastr, $uibModal, $interval, userUtils) {


            if (userUtils.isEmitter() || userUtils.isManager()) {


                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource = EmailMessage;
                $scope.refreshing = false;
                $scope.messages = [];

                $scope.search = {
                    search: $location.search().search
                };
                // $scope.callAtInterval = function () {
                //     $scope.refreshing = true;
                //     $scope.$broadcast('onRefresh');
                // };
                //
                // $interval(function () {
                //     $scope.callAtInterval();
                // }, 132000);

                var init = function () {
                    $scope.filterCriteria.addParam('filed', 1);
                };

                $scope.filter = function (search) {
                    $scope.$broadcast('onSearch', search);
                };

                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');

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
                                $scope.refreshing = true;
                                $scope.$broadcast('onRefresh');
                            }
                        }
                    );
                };

                $scope.arquived = function (message) {
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

                $scope.unarchive = function (message) {
                    var id_message = message.id;
                    EmailMessage.unarchive({id: id_message}, {},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Email desarquivado!");
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
            }else {window.history.back();}
        }]);

