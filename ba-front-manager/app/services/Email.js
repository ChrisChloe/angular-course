/**
 * Email Service
 */
angular
    .module("app.services")
    .service('Email', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/emails/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'restore':{
                        url: appConfig.baseUrl + '/emails/:id/restore',
                        method: 'GET'
                    },
                    'read_mail':{
                        url: appConfig.baseUrl + '/emails/read',
                        method: 'POST'
                    }
                });
        }]);
