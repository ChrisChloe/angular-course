/**
 * Search Service
 */
angular
    .module("app.services")
    .service('Search', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/searches/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'chartCount': {
                        method: 'GET',
                        url:    appConfig.baseUrl + '/searches/chart/count'
                    },
                    'chartHour': {
                        method: 'GET',
                        url:    appConfig.baseUrl + '/searches/chart/count-hour'
                    }
                });
        }]);
