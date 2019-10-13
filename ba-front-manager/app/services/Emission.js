/**
 * Emission Service
 */
angular
    .module("app.services")
    .service('Emission', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/emissions/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'ticket':  {
                        url: appConfig.baseUrl + '/emissions/:id/ticket',
                        method: 'GET',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            return {
                                data: data,
                                file_name: headers('File-Name') ? headers('File-Name') : 'anexo.pdf',
                                content_type: headers('Content-Type') ? headers('Content-Type') : 'aplication/pdf'
                            };
                        }
                    },
                    'sendTicket':  {
                        url: appConfig.baseUrl + '/emissions/:id/send-ticket',
                        method: 'POST'
                    },
                    'calculatePrices':  {
                        url: appConfig.baseUrl + '/emissions/calculate-prices',
                        method: 'GET'
                    },
                    'status':  {
                        url: appConfig.baseUrl + '/emissions/:id/status',
                        method: 'PUT'
                    },
                    'liquidate':   {
                        method: 'GET',
                        url: appConfig.baseUrl + '/emissions/liquidate'
                    },
                    'liquidateProvider':   {
                        method: 'GET',
                        url: appConfig.baseUrl + '/emissions/liquidate-provider'
                    },
                    'reverse':   {
                        method: 'GET',
                        url: appConfig.baseUrl + '/emissions/reverse'
                    },
                    'checkInQuery':  {
                        url: appConfig.baseUrl + '/emissions/check-in',
                        method: 'GET'
                    },
                    'checkIn':  {
                        url: appConfig.baseUrl + '/emissions/:id/check-in',
                        method: 'GET'
                    },
                    'verifyCheckIn':  {
                        url: appConfig.baseUrl + '/emissions/:id/verify-check-in',
                        method: 'GET'
                    },
                    'addProblem':  {
                        url: appConfig.baseUrl + '/emissions/:id/add-problem',
                        method: 'POST'
                    },
                    'sendMail':  {
                        url: appConfig.baseUrl + '/emissions/:id/send-mail',
                        method: 'POST'
                    },
                    'getToInvoice':{
                        url: appConfig.baseUrl + '/emissions/to-invoice',
                        method: 'GET'
                    },
                    'invoiceTo':{
                        url: appConfig.baseUrl + '/emissions/invoiceTo',
                        method: 'POST'
                    }
                });
        }]);
