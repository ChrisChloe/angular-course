/**
 * Role Service
 */
angular
    .module("app.services")
    .service('Role', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/roles/:id', null,
            {
                'get':    {method: 'GET'},
                'save':   {method: 'POST'},
                'query':  {method: 'GET', isArray: false},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},
                'update': {method: 'PUT'}
            });
    }]);
