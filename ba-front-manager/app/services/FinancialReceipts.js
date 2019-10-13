/**
 * FinancialReceipts Service
 */
angular
    .module("app.services")
    .service('FinancialReceipts', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'cancelBillets':  {
                        method: 'post',
                        url: appConfig.baseUrl + '/invoices/cancel'
                    },
                    'changeDueDate':  {
                        method: 'post',
                        url: appConfig.baseUrl +  '/financial/receipts/changeDueDate'
                    },
                    'createBillets':  {
                        method: 'post', 
                        url: appConfig.baseUrl +  '/financial/receipts/send'
                    },
                    'getRemittanceBanks':  {method: 'post'},
                    'getClients':  {method: 'post'},
                    'getStatus':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'getTransactionCode':  {method: 'post'},
                    'query':  {method: 'post'}
                });
        }]);
