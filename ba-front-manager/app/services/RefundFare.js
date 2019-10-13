/**
 * Refund-Fares Service
 */
angular
    .module("app.services")
    .service('RefundFare', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/refund-fares/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':  {
                        url: appConfig.baseUrl + '/refund-fares/:id/restore',
                        method: 'GET'
                    }
                });
        }]);
