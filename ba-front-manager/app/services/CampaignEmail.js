/**
 * CampaignEmail Service
 */
angular
    .module("app.services")
    .service('CampaignEmail', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/campaign-emails/:id', null,
                {
                    'get':    {method: 'GET'},
                    'query':  {method: 'GET', isArray: false}
                });
        }]);
