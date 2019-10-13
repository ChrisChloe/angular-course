/**
 * Conciliation Service
 */
angular
    .module("app.services")
    .service('Conciliation', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/credit-card-statements', null,
                {
                    'get':          {method: 'GET'},
                    'save':         {method: 'POST'},
                    'query':        {method: 'GET', isArray: false},
                    'remove':       {method: 'DELETE'},
                    'delete':       {method: 'DELETE'},
                    'update':       {method: 'PUT'}
                });
        }]);
