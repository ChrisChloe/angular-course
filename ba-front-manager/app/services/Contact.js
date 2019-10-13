/**
 * Api Service
 */
angular
    .module("app.services")
    .service('Contact', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/contacts/:id', null,
                {
                    'get':           {method: 'GET'},
                    'query':         {method: 'GET', isArray: false},
                    'updateStatus':  {method: 'PUT'}
                });
        }]);
