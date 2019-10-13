/**
 * EmissionRequest Service
 */
angular
    .module("app.services")
    .service('EmissionRequest', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/emission-requests/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'update': {method: 'PUT'},
                    'query':  {method: 'GET', isArray: false}
                });
        }]);
