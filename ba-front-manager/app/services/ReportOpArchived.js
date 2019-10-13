/**
 * ReportOpArchived Service
 */
angular
    .module("app.services")
    .service('ReportOpArchived', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseAuthUrl + '/api/ops/archived-reason', null,
                {
                    'query':    {method: 'GET'},
                });
        }]);
