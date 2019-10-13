/**
 * FinancialReceiptsExpired Service
 */
angular
    .module("app.services")
    .service('FinancialReceiptsExpired', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'cancelBillets':  {
                        method: 'post',
                        url: appConfig.baseUrl + '/invoices/cancel'
                    },
                    'calcInterest':  {
                        method: 'post', 
                        url: appConfig.baseUrl +  '/financial/receipts/calcInterest'
                    },
                    'getRemittanceBanks':  {method: 'post'},
                    'getClients':  {method: 'post'},
                    'getStatus':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'query':  {method: 'post'}
                });
        }]);
