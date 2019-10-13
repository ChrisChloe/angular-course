/**
 * OpInspection Service
 */
angular
    .module("app.services")
    .service('OpInspection', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/op-inspections', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'verify': {
                        url: appConfig.baseUrl + '/op-inspections/:id/verify',
                        method: 'POST'
                    },
                    'verifyByService': {
                        url: appConfig.baseUrl + '/op-inspections/:id/verify-service',
                        method: 'POST'
                    }
                });
        }]);
