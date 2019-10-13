/**
 * Api Service
 */
angular
    .module("app.services")
    .service('Api', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/apis/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'config': {
                        method: 'POST',
                        url:    appConfig.baseUrl + '/api/config'
                    },
                    'purge': {
                        method: 'POST',
                        url:    appConfig.baseUrl + '/api/purge'
                    }
                });
        }]);
