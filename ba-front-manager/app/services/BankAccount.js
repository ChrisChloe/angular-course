/**
 * FinancialPayable Service
 */
angular
    .module("app.services")
    .service('BankAccount', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'query':     {method: 'post'},
                    'get':       {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'save':      {method: 'post'},
                    'update':    {method: 'post'}


                });
        }]);
