/**
 * HelpDesk
 */
angular
    .module("app.services")
    .service('HelpDesk', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseMonitorUrl + '/occurrence/store', null,
                {
                    'get':    {method: 'GET'},
                    'store':   {method: 'POST'},
                });
        }]);
