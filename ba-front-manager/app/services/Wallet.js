/**
 * wallet Service
 */
angular
    .module("app.services")
    .service('Wallet', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/wallets/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'},
                    'restore':  {
                        url: appConfig.baseUrl + '/wallets/:id/restore',
                        method: 'GET'
                    },
                    'trash':  {
                        url: appConfig.baseUrl + '/wallets/:id/trash',
                        method: 'DELETE'
                    }
                });
        }]);
