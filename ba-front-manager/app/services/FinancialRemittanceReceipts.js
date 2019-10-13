/**
 * FinancialRemittanceReceipts Service
 */
angular
    .module("app.services")
    .service('FinancialRemittanceReceipts', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'download':  {method: 'post', isArray: false},
                    'getClients':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'query':  {method: 'post'},
                    'view':  {method: 'post'},
                    'create':  {method: 'post'}
                });
        }]);
