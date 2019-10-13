/**
 * SearchGroup Service
 */
angular
    .module("app.services")
    .service('SearchGroup', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/search-groups/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'chartCount': {
                        method: 'GET',
                        url:    appConfig.baseUrl + '/search-groups/chart/count'
                    },
                    'chartHour': {
                        method: 'GET',
                        url:    appConfig.baseUrl + '/search-groups/chart/count-hour'
                    }
                });
        }]);
