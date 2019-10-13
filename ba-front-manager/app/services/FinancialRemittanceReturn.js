/**
 * FinancialRemittanceReturn Service
 */
angular
    .module("app.services")
    .service('FinancialRemittanceReturn', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'download':  {method: 'post', isArray: false},
                    'getClients':  {method: 'post'},
                    'getStatus':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'query':  {method: 'post'},
                    'view':  {method: 'post'}
                });
        }]);
