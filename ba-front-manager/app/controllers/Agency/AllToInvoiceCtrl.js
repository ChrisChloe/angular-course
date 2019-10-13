/**
 * AllToInvoiceCtrl index controller
 */
angular
    .module('app.controllers')
    .controller('AllToInvoiceCtrl', ['$scope', '$state', 'appConfig', 'Agency',
        function ($scope, $state, appConfig, Agency) {

            $scope.resource = Agency;
            $scope.resourceFunction = 'allEmissionsToInvoice';
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.invoices = [];

            var init = function () { };
            $scope.getTotalAmount = function (invoice) {

                console.log(invoice.miles_price);
                console.log(invoice.shipping_rate);
                console.log(invoice.baggage_price);

                return parseFloat(invoice.miles_price) + parseFloat(invoice.shipping_rate) + parseFloat(invoice.baggage_price);
            };

            /**
            *
            * Filter
            * @param search
            * @return void
            */
            $scope.filter = function (search) {
                if (search.due_date) {
                    search.due_date_invoice = moment(search.due_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                }

                if (search.start_date && search.end_date) {
                    search.start_date = moment(moment(search.start_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                    search.end_date = moment(moment(search.end_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                }

                $scope.$broadcast('onSearch', search);
            };

            init();

        }]);

