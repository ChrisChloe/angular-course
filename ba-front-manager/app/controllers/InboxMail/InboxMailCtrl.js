/**
 * Inbox Mail index controller
 */
angular
    .module('app.controllers')
    .controller('InboxMailCtrl', ['$scope', '$state', '$location', 'appConfig', 'InboxMail', 'toastr', '$uibModal','$interval',
        function ($scope, $state, $location, appConfig, InboxMail, toastr, $uibModal,$interval) {

            var emailId = $state.params.id;
            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = InboxMail;
            $scope.refreshing = false;
            $scope.messages = [];

            $scope.search = {
                search: $location.search().search
            };

            $scope.callAtInterval = function() {
                $scope.refreshing = true;
                $scope.$broadcast('onRefresh');
            };

            $interval( function(){ $scope.callAtInterval(); }, 162000);

            var init = function () {
                $scope.filterCriteria.addParam('email_id', emailId);
                $scope.filterCriteria.addParam('orderBy', 'received_at');
            };

            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            $scope.refresh = function(){
                $scope.refreshing = true;
                $scope.$broadcast('onRefresh');

            };

            /**
             *
             * @param message
             */
            $scope.show = function(message){

                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/inbox-mail/show.html',
                    controller:  'InboxMailShowCtrl',
                    size:        'lg',
                    resolve: {
                        id:  message.id
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });
            };


            $scope.attachment = function(message){
                var id_message = message.id;
                EmailMessage.download({id:id_message}, {},
                    function successCallback(response) {
                        $scope.createFile(response);
                    }, function errorCallback(response) {
                        console.log('Não foi possível baixar o anexo');
                    }
                );
            };

            $scope.createFile = function(data) {
                var file = new Blob([data.string], {type: 'text/plain'}),
                    url      = (window.URL || window.webkitURL).createObjectURL(file),
                    a        = document.createElement('a');

                document.getElementsByTagName("body")[0].appendChild(a);

                a.href     = url;
                a.download = data.filename;
                a.target   = '_blank';
                a.click();
            };

            init();
        }]);

