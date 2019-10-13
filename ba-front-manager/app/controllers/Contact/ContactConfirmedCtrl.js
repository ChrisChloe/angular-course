/**
 * Company index controller
 */
angular
    .module('app.controllers')
    .controller('ContactConfirmedCtrl', ['$scope', '$state', 'appConfig', 'Contact', 'toastr',
        function ($scope, $state, appConfig, Contact, toastr) {

            $scope.resource = Contact;
            $scope.contacts = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            var init = function () {
                $scope.filterCriteria.addParam('status', 1); //contatos finalizados
            };

            $scope.obsDropdown = function(contact){
                contact.open = !contact.open;
            }

            $scope.archive = function (contact) {
                Contact.updateStatus({id: contact.id}, {status: 2},
                    function success(response) {
                        if (!response.error) {
                            toastr.success("Arquivado!");
                            $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                        }
                    });
            };

            init();
        }]);

