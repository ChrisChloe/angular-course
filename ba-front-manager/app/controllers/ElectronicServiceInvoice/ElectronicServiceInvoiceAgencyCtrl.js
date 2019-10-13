/**
 * ElectronicServiceInvoiceAgencyCtrl controller
 */
angular
    .module('app.controllers')
    .controller('ElectronicServiceInvoiceAgencyCtrl', ['$scope', '$state', 'toastr', '$filter', 'appConfig', 'ElectronicServiceInvoice', 'Agency',
        function ($scope, $state, toastr, $filter, appConfig, ElectronicServiceInvoice, Agency) {

            $scope.agencies = [];

            $scope.resource = Agency;
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.filterCriteria.addParam('with_electronic_service_invoice', 'true');
            $scope.filterCriteria.addParam('emissions_to_electronic_service_invoice', 'true');

            var init = function () {
            };

            init();

        }]);
