/**
 * MailConfig Service
 */
angular
    .module("app.services")
    .service('EmailConfig', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/email-configs/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':  {
                        url: appConfig.baseUrl + '/email-configs/:id/restore',
                        method: 'GET'
                    }
                });
        }]);
