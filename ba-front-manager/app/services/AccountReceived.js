/**
 * FinancialPayable Service
 */
angular
    .module("app.services")
    .service('AccountReceived', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'query':            {method: 'post'},
                    'getBankAccounts':  {method: 'post'},
                    'getCreditTypes':   {method: 'post'},
                });
        }]);
