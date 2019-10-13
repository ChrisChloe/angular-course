/**
 * StockLog Service
 */
angular
    .module("app.services")
    .service('StockLog', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/stock-logs/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'}
                });
        }]);
