/**
 * Balance Service
 */
angular
    .module("app.services")
    .service('Balance', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/balances/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'update': {method: 'PUT'},
                    'confirm':{
                        url: appConfig.baseUrl + '/balances/:id/confirm',
                        method: 'GET'
                    },
                    'cancel':{
                        url: appConfig.baseUrl + '/balances/:id/cancel',
                        method: 'GET'
                    }
                });
        }]);
