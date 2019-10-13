/**
 * Company Service
 */
angular
    .module("app.services")
    .service('Company', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/companies/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'}/*,
                    'updateCache': {
                        method: 'PUT',
                        url: appConfig.baseUrl + '/companies/:id/cache'
                    }*/
                });
        }]);
