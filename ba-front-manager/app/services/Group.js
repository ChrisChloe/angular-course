/**
 * Group Service
 */
angular
    .module("app.services")
    .service('Group', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/groups/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'},
                    'restore':  {
                        url: appConfig.baseUrl + '/groups/:id/restore',
                        method: 'GET'
                    },
                    'trash':  {
                        url: appConfig.baseUrl + '/groups/:id/trash',
                        method: 'DELETE'
                    }
                });
        }]);
