/**
 * EmailMessage Service
 */
angular
    .module("app.services")
    .service('EmailMessage', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/email-messages/:id', null,
                {
                    'get':    {method: 'GET'},
                    'query':  {method: 'GET', isArray: false},
                    'release':  {
                        url: appConfig.baseUrl + '/ops/release/:id',
                        method: 'POST'
                    },
                    'arquived':  {
                        url: appConfig.baseUrl + '/emails-arquived/:id',
                        method: 'POST'
                    },
                    'pending':  {
                        url: appConfig.baseUrl + '/emails-pending/:id',
                        method: 'POST'
                    },
                    'notify':  {
                        url: appConfig.baseUrl + '/email-message/notify/',
                        method: 'POST'
                    },
                    'attachment':  {
                        url: appConfig.baseUrl + '/emails-attachment/find',
                        method: 'POST'
                    },
                    'reply':  {
                        url: appConfig.baseUrl + '/emails-reply/:id',
                        method: 'POST'
                    },
                    'send':  {
                        url: appConfig.baseUrl + '/emails-send',
                        method: 'POST'
                    },
                    download: {
                        url: appConfig.baseUrl + '/email-message/download/:id',
                        method: 'GET',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            return {
                                data: data,
                                file_name: headers('file-Name') ? headers('File-Name') : 'anexo.pdf',
                                content_type: headers('Content-Type') ? headers('Content-Type') : 'aplication/pdf'
                            };
                        }
                    },
                    'filed':  {
                        url: appConfig.baseUrl + '/emails-filed/:id',
                        method: 'POST'
                    },
                    'unarchive':  {
                        url: appConfig.baseUrl + '/emails-unarchive/:id',
                        method: 'POST'
                    },
                    'reserved': {
                        url: appConfig.baseUrl + '/inbox-mail/',
                        method: 'GET'
                    }
                });
        }]);
