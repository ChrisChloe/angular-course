/**
 * PriceMarkup Service
 */
angular
    .module("app.services")
    .service('PriceMarkup', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/pricemarkups/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':  {
                        url: appConfig.baseUrl + '/pricemarkups/:id/restore',
                        method: 'GET'
                    }
                });
        }]);
