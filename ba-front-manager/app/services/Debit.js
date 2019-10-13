/**
 * Debit Service
 */
angular
    .module("app.services")
    .service('Debit', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/debits/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}                    
                });
        }]);