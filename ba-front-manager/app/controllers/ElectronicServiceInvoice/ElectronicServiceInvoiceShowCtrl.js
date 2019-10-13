/**
 * ElectronicServiceInvoiceShow controller
 */
angular
    .module('app.controllers')
    .controller('ElectronicServiceInvoiceShowCtrl', ['$scope', '$state', 'toastr', '$filter', 'appConfig', 'ElectronicServiceInvoice', 'Emission',
        function ($scope, $state, toastr, $filter, appConfig, ElectronicServiceInvoice, Emission) {

            var invoiceId  = $state.params.id;

            $scope.electronicServiceInvoice = null;

            $scope.emissions = [];
            $scope.EmissionResource = Emission;
            $scope.filterEmissionsCriteria  = appConfig.filterCriteria();
            $scope.filterEmissionsCriteria.addParam('electronic_service_invoice_id', invoiceId);

            /**
             *
             * Initializer
             * @return void
             */
            var init = function () {

                ElectronicServiceInvoice.get({id: invoiceId},
                    function success(data) {
                        $scope.electronicServiceInvoice = data.data;
                    });
            };

            init();

        }]);
