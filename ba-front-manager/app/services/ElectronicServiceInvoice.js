/**
 * ElectronicServiceInvoice
 */
angular
    .module("app.services")
    .service('ElectronicServiceInvoice', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/electronic-service-invoices/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'update': {method: 'PUT'},
                    'retry':  {
                        url: appConfig.baseUrl + '/electronic-service-invoices/:id/retry',
                        method: 'GET'
                    },
                    'cancel':  {
                        url: appConfig.baseUrl + '/electronic-service-invoices/:id/cancel',
                        method: 'GET'
                    }
                });
        }]);
