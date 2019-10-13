/**
 * Email Message index controller
 */
angular
    .module('app.controllers')
    .controller('EmailMessageReserve', ['$scope', '$state', '$location', 'appConfig', 'EmailMessage', 'toastr', '$uibModal','$interval','userUtils',
        function ($scope, $state, $location, appConfig, EmailMessage, toastr, $uibModal, $interval, userUtils) {

            if (userUtils.isEmitter() || userUtils.isManager()) {

                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.refreshing = false;
                $scope.fileds     = false;
                $scope.messages   = [];
                $scope.resource   = EmailMessage;
                $scope.resourceFunction = "reserved";

                $scope.search = {
                    search: $location.search().search
                };

                $scope.callAtInterval = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');
                };

                var init = function () {
                    $scope.filterCriteria.addParam('email_id', appConfig.emailReserve);
                    $scope.filterCriteria.addParam('orderBy', "received_at");
                };

                $scope.filter = function (search) {
                    $scope.$broadcast('onSearch', search);
                };

                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');
                };

                $scope.show = function (message) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/inbox-mail/show.html',
                        controller: 'InboxMailShowCtrl',
                        size: 'lg',
                        resolve: {
                            id: message.id
                        }
                    });

                    modalInstance.result.then(function () {
                        load();
                    });
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

                $scope.loadFiled = function () {
                    if($scope.fileds){

                        $scope.filterCriteria.removeParam('filed');
                        $scope.filterCriteria.addParam('filed', 0);
                        $scope.fileds = false;
                        EmailMessage.reserved($scope.filterCriteria.getParams(), function (response) {
                            $scope.messages = response.data;
                        });

                    } else {

                        $scope.filterCriteria.removeParam('filed');
                        $scope.filterCriteria.addParam('filed', 1);

                        $scope.fileds = true;
                        EmailMessage.reserved($scope.filterCriteria.getParams(), function (response) {
                            $scope.messages = response.data;
                        });
                    }
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

