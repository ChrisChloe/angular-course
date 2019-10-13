/**
 * MailAccount Service
 */
angular
    .module("app.services")
    .service('EmailAccount', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/email-accounts/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':  {
                        url: appConfig.baseUrl + '/email-accounts/:id/restore',
                        method: 'GET'
                    }
                });
        }]);
