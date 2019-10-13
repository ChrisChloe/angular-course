/**
 * Campaign Service
 */
angular
    .module("app.services")
    .service('Campaign', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/campaigns/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'agencyEmails':  {
                        url: appConfig.baseUrl + '/campaigns/agency-emails',
                        method: 'GET', 
                        isArray: false
                    },
                    'userEmails':  {
                        url: appConfig.baseUrl + '/campaigns/user-emails',
                        method: 'GET',
                        isArray: false
                    },
                    'sendTest': {
                        url: appConfig.baseUrl + '/campaigns/test',
                        method: 'POST'
                    },
                    'sendGroupCampaign': {
                        url: appConfig.baseUrl + '/campaigns',
                        method: 'POST'
                    },
                    'sendSpecificCampaign': {
                        url: appConfig.baseUrl + '/campaigns/list',
                        method: 'POST'
                    }
                });
        }]);
