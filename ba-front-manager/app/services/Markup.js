/**
 * Markup Service
 */
angular
    .module("app.services")
    .service('Markup', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/markups/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':  {
                        url: appConfig.baseUrl + '/markups/:id/restore',
                        method: 'GET'
                    }
                });
        }]);
