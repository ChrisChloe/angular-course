/**
 * Airport Service
 */
angular
    .module("app.services")
    .service('Airport', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/airports/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'},
                    'trash':  {
                        url: appConfig.baseUrl + '/airports/:id/trash',
                        method: 'DELETE'
                    },
                    'restore':  {
                        url: appConfig.baseUrl + '/airports/:id/restore',
                        method: 'GET'
                    }
                });
        }]);
