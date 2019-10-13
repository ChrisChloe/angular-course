/**
 * InboxMail Service
 */
angular
    .module("app.services")
    .service('InboxMail', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/inbox-mail/:id', null,
                {
                    'get':    {method: 'GET'},
                    'query':  {method: 'GET', isArray: false},
                    'attachment':  {
                        url: appConfig.baseUrl + '/emails/find',
                        method: 'POST'
                    },
                    'getinbox':  {
                        url: appConfig.baseUrl + '/emails/:id/agency',
                        method: 'GET'
                    },
                    download: {
                        url: appConfig.baseUrl + '/emails/download',
                        method: 'POST',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            return {
                                data: data,
                                file_name: headers('file-Name') ? headers('File-Name') : 'anexo.pdf',
                                content_type: headers('Content-Type') ? headers('Content-Type') : 'aplication/pdf'
                            };
                        }
                    }
                });
        }]);
