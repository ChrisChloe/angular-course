/**
 * Company index controller
 */
angular
    .module('app.controllers')
    .controller('ContactArchivedCtrl', ['$scope', '$state', 'appConfig', 'Contact', 'toastr',
        function ($scope, $state, appConfig, Contact, toastr) {

            $scope.resource = Contact;
            $scope.contacts = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.obsDropdown = function(contact){
                contact.open = !contact.open;
            }

            var init = function () {
                $scope.filterCriteria.addParam('status', 2); //contatos arquivados
            };

            init();
        }]);

