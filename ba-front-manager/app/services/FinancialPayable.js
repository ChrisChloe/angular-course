/**
 * FinancialPayable Service
 */
angular
    .module("app.services")
    .service('FinancialPayable', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'createRemittance':  {method: 'post', isArray: false},
                    'getRemittanceBanks':  {method: 'post'},
                    'getClients':  {method: 'post'},
                    'getStatus':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'query':  {method: 'post'},
                });
        }]);
