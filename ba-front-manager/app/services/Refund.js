/**
 * Refund Service
 */
angular
    .module("app.services")
    .service('Refund', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/refund/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'status':  {
                        url: appConfig.baseUrl + '/refund/:id/status',
                        method: 'PUT'
                    }
                });
        }]);
