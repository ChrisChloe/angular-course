/**
 * Op Service
 */
angular
    .module("app.services")
    .factory('Op', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/ops/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {
                        url: appConfig.baseUrl + '/ops/manager/all',
                        method: 'GET',
                        isArray: false
                    },
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'directTo': {
                        url: appConfig.baseUrl + '/ops/direct-to',
                        method: 'POST'
                    },
                    'notify': {
                        url: appConfig.baseUrl + '/ops/notify',
                        method: 'POST'
                    },
                    'capturePayment': {
                        url: appConfig.baseUrl + '/ops/braspag-capture/:id',
                        method: 'GET'
                    },
                    'releaseAdmission': {
                        url: appConfig.baseUrl + '/ops/release-admission/:id',
                        method: 'GET'
                    },
                    'downloadFileTransfer': {
                        url: appConfig.baseUrl + '/ops/bank-transfer/download/:id/:filename',
                        method: 'GET',
                        responseType: 'arraybuffer',
                        transformResponse: function (data, headers) {
                            return {
                                data: data,
                                file_name: headers('File-Name'),
                                content_type: headers('Content-Type')
                            };
                        }
                    },
                    'updateFileTransferStatus': {
                        url: appConfig.baseUrl + '/ops/bank-transfer/update',
                        method: 'POST',
                        json: true
                    },
                    'updateStatusActiveBankTransfer': {
                        url: appConfig.baseUrl + '/ops/bank-transfer/active/:id',
                        method: 'POST'
                    },
                    'updateStatusToActive': {
                        url: appConfig.baseUrl + '/ops/update-status/active/:id',
                        method: 'POST'
                    },
                    'updateFormPayment': {
                        url: appConfig.baseUrl + '/ops/form-payment/update/:id',
                        method: 'POST'
                    },
                    'auditLog': {
                        url: appConfig.baseUrl + '/op/audit-log/:id',
                        method: 'GET',
                        isArray: false
                    },
                    'createBankTransferAttachment': {
                        url: appConfig.baseUrl + '/ops/financial/upload',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }

                }
            );
    }]);
