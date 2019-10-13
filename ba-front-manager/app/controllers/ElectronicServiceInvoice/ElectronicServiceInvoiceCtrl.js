/**
 * EInvoiceCtrl controller
 */
angular
    .module('app.controllers')
    .controller('ElectronicServiceInvoiceCtrl', ['$scope', '$state', 'toastr', '$filter', '$interval', 'appConfig', 'ElectronicServiceInvoice',
        function ($scope, $state, toastr, $filter, $interval, appConfig, ElectronicServiceInvoice) {

            $scope.electronicServiceInvoices = [];

            $scope.resource = ElectronicServiceInvoice;
            $scope.filterCriteria = appConfig.filterCriteria();

            /**
             *
             * Initializer
             * @return void
             */
            var init = function () {

            };

            /**
            * Lock refresh button and call refresh event
            */
            $scope.refresh = function () {
                $scope.$broadcast('onRefresh');

            };

            $scope.filter = function (search) {
                $scope.$broadcast('onSearch', search);
            };

            $scope.retry = function (e) {
                ElectronicServiceInvoice.retry({ id: e.id },
                    function success(data) {
                        e.status = 2;
                        e.status_title = 'Emitindo';
                    });
            };

            $scope.cancel = function (e) {
                ElectronicServiceInvoice.cancel({ id: e.id },
                    function success(data) {
                        updateEInvoice(data.data);
                        toastr.success('Emissão cancelada!');
                    });
            };

            init();

        }]);
