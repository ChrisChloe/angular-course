/**
 * FinancialPayments Service
 */
angular
    .module("app.services")
    .service('FinancialPayments', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'getClients':  {method: 'post'},
                    'getStatus':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'archive':  {method: 'post'},
                    'query':  {method: 'post'},
                });
        }]);
