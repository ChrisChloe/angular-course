/**
 * ElectronicServiceInvoiceCreateCtrl controller
 */
angular
    .module('app.controllers')
    .controller('ElectronicServiceInvoiceCreateCtrl', ['$scope', '$rootScope', 'agency', 'emissions', '$state', 'toastr', '$filter', 'appConfig', 'ElectronicServiceInvoice', '$uibModalInstance',
        function ($scope, $rootScope, agency, emissions, $state, toastr, $filter, appConfig, ElectronicServiceInvoice, $uibModalInstance) {

            $scope.invoice = new ElectronicServiceInvoice();
            $scope.invoice.agency_id   = agency.id;
            $scope.invoice.emissions   = [];
            $scope.invoice.cpf_cnpj    = agency.cpf_cnpj;
            $scope.invoice.price       = 0;
            $scope.invoice.description = null;
            $scope.invoice.status      = 1;

            /**
             *
             * Initializer
             * @return void
             */
            var init = function () {
                $scope.invoice.description = "Emissão de bilhetes aéreos.";

                $scope.invoice.price = emissions.reduce(function(total, emission) {
                    return total + (emission.miles_price + emission.shipping_rate + emission.baggage_price);
                }, 0);

                emissions.forEach(function(e) {
                    $scope.invoice.emissions.push(e.id);
                    $scope.invoice.description += "\nV. " + e.sale;
                });

            };

            $scope.close = function(){
                $uibModalInstance.close();
            };

            $scope.save = function(invoice){
                invoice.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.invoice.id = data.data.id;
                            $scope.invoice.status_title = data.data.status_title;
                            toastr.success("Enviado!");
                            $rootScope.$broadcast('onRefresh');
                            $rootScope.$emit('onRefresh');
                        }
                    }
                );

            };

            init();

        }]);
