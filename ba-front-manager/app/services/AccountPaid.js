/**
 * FinancialPayable Service
 */
angular
    .module("app.services")
    .service('AccountPaid', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'query':            {method: 'post'},
                    'getBankAccounts':  {method: 'post'},
                    'getDebitTypes':    {method: 'post'},
                    'save':             {method: 'post'},
                });
        }]);
