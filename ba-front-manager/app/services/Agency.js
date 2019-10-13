/**
 * Agency Service
 */
angular
    .module("app.services")
    .service('Agency', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/agencies/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'cpf':  {
                        url: appConfig.baseVisionUrl + '/cpf/:cpf',
                        method: 'GET'
                    },
                    'cep':  {
                        url: appConfig.baseVisionUrl + '/cep/:cep',
                        method: 'GET'
                    },
                    'cnpj':  {
                        url: appConfig.baseVisionUrl + '/cnpj/:cnpj',
                        method: 'GET'
                    },
                    'trash':  {
                        url: appConfig.baseUrl + '/agencies/:id/trash',
                        method: 'DELETE'
                    },
                    'restore':  {
                        url: appConfig.baseUrl + '/agencies/:id/restore',
                        method: 'GET'
                    },
                    'counters':  {
                        url: appConfig.baseUrl + '/agencies/:id/counters',
                        method: 'GET'
                    },
                    'cancelCredit': {
                        url: appConfig.baseUrl + '/credits/cancel',
                        method:'POST'
                    },
                    'generateToken':  {
                        url: appConfig.baseUrl + '/agencies/generateToken',
                        method: 'POST'
                    },
                    'getPhoneCalls': {
                        url: appConfig.baseAuthUrl + '/crm/api/phoneCalls/all',
                        method: 'GET'
                    },
                    'downloadPhoneCall': {
                        url: appConfig.baseAuthUrl + '/crm/api/phoneCalls/download/:id',
                        method: 'GET'
                    },
                    'verifyIfExists': {
                        url: appConfig.baseUrl + '/agencies/find/:cpf_cnpj'
                    },
                    'agenciesByStatus': {
                        url: appConfig.baseUrl + '/agencies/states-status',
                        method: 'GET'
                    },
                    'updateAditionalAddress': {
                        url: appConfig.baseUrl + '/addresses/update/:id',
                        method: 'PUT'
                    },
                    'createAditionalAddress': {
                        url: appConfig.baseUrl + '/addresses/create',
                        method: 'POST'
                    },
                    'getAditionalAddress': {
                        url: appConfig.baseUrl + '/addresses/byAddressable',
                        method: 'GET'
                    },
                    'deleteAditionalAddress': {
                        url: appConfig.baseUrl + '/addresses/:id',
                        method: 'DELETE'
                    },
                    'agenciesToInvoice': {
                        url: appConfig.baseUrl + '/agencies/emissions-to-invoice',
                        method: 'GET'
                    },
                    'allEmissionsToInvoice': {
                        url: appConfig.baseUrl + '/emissions-to-invoice',
                        method: 'GET'
                    },
                    'agencyToInvoice': {
                        url: appConfig.baseUrl + '/emissions-to-invoice-agency/:id',
                        method: 'GET'
                    }
                    
                });
        }]);

