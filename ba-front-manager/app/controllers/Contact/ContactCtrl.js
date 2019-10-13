/**
 * Company index controller
 */
angular
    .module('app.controllers')
    .controller('ContactCtrl', ['$scope', '$state', 'appConfig', 'Contact', 'toastr', '$uibModal',
        function ($scope, $state, appConfig, Contact, toastr, $uibModal) {

            $scope.resource = Contact;
            $scope.contacts = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            var init = function () {
                $scope.filterCriteria.addParam('status', 0); //contatos recebidos
            };

            // $scope.archive = function (contact) {
            //     Contact.updateStatus({id: contact.id}, {status: 2},
            //         function success(response) {
            //             if (!response.error) {
            //                 toastr.success("Arquivado!");
            //                 $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
            //             }
            //         });
            // };

            // $scope.confirm = function (contact) {
            //     Contact.updateStatus({id: contact.id}, {status: 1},
            //         function success(response) {
            //             if (!response.error) {
            //                 toastr.success("Contato finalizado!");
            //                 $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
            //             }
            //         });
            // };



            $scope.show = function (id, contact) {
                
                if(id == 1){
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/contacts/desc-input.html',
                        controller: 'ContactArchiveDescCtrl',
                        size: 'md',
                        resolve: {
                            contact: contact,
                            update: $scope
                        }
                    });
                }else{
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/contacts/desc-input.html',
                        controller: 'ContactConfirmedDescCtrl',
                        size: 'md',
                        resolve: {
                            contact: contact,
                            update: $scope
                        }
                    });
                }

                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');
                };

                modalInstance.result.then(function () {
                    load();
                });
            };

            init();
        }]);

