/**
 * Card Observation Service
 */
angular
    .module("app.services")
    .service('CardObservation', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/card-observations/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'}
                });
        }]);
