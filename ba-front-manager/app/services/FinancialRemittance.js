/**
 * FinancialRemittance Service
 */
angular
    .module("app.services")
    .service('FinancialRemittance', ['$resource', 'appConfig',
        function ($resource, appConfig) {
            return $resource(appConfig.baseFinUrl + '/financeiro', null,
                {
                    'download':  {method: 'post', isArray: false},
                    'getClients':  {method: 'post'},
                    'getBanks':  {method: 'post'},
                    'query':  {method: 'post'},
                    'view':  {method: 'post'},
                    'cancelRemittance': {method: 'post'}
                });
        }]);
