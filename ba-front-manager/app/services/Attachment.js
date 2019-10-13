/**
 * Attachment Service
 */
angular
    .module("app.services")
    .factory('Attachment', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/attachments/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'download': {
                        method: 'GET',
                        url: appConfig.baseUrl + '/attachments/:id/download',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            return {
                                data: data,
                                file_name: headers('File-Name') ? headers('File-Name') : 'anexo.pdf',
                                content_type: headers('Content-Type') ? headers('Content-Type') : 'aplication/pdf'
                            };
                        }
                    }
                }
            );
        }]);
