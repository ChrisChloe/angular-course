/**
 * Agency Service
 */
angular
    .module("app.services")
    .service('Report', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/reports-change/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'agency':  {
                        url: appConfig.baseUrl + '/agency-reports-change',
                        method: 'GET'
                    },
                });
        }]);
