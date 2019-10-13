/**
 * TravelMarkup Service
 */
angular
    .module("app.services")
    .service('TravelMarkup', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/travel-markups/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':  {
                        url: appConfig.baseUrl + '/travel-markups/:id/restore',
                        method: 'GET'
                    },
                    'updatePrices':  {
                        url: appConfig.baseUrl + '/travel-markups/update-price',
                        method: 'POST'
                    }
                });
        }]);
