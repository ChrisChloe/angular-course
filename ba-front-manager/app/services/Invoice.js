/**
 * Invoice Service
 */
angular
    .module("app.services")
    .service('Invoice', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/invoices/:id', null,
                {
                    'get'  :{method: 'GET'},
                    'query':{method: 'GET', isArray: false},
                    'save' :{
                        method: 'POST',
                        url: appConfig.baseUrl +'/invoices/'
                    },
                    'liquidate' :{
                        method: 'POST',
                        url: appConfig.baseUrl +'/invoice/liquidate/'
                    },
                    'downloadPdf': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/invoice/downloadPdf',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            return {
                                data: data,
                                file_name: headers('File-Name') ? headers('File-Name') : 'anexo.pdf',
                                content_type: headers('Content-Type') ? headers('Content-Type') : 'aplication/pdf'
                            };
                        }
                    }
                });
        }]);
