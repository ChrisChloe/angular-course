/**
 * Cache Service
 */
angular
    .module("app.services")
    .service('Call', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseAuthUrl + '/crm/click-call', null,
                {
                    'call':    {method: 'POST'},
                });
        }]);
