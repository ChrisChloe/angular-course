/**
 * Card Type Service
 */
angular
    .module("app.services")
    .service('CardType', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/card-types/:id', null,
                {
                    'get':          {method: 'GET'},
                    'save':         {method: 'POST'},
                    'query':        {method: 'GET', isArray: false},
                    'remove':       {method: 'DELETE'},
                    'delete':       {method: 'DELETE'},
                    'update':       {method: 'PUT'},
                    'virtual':  {
                        url: appConfig.baseUrl + '/card-types-virtual',
                        method: 'GET'
                    },
                    'withProblem':  {
                        url: appConfig.baseUrl + '/card-types-withProblem',
                        method: 'GET'
                    }
                });
        }]);
