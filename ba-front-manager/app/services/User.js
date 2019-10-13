/**
 * User Service
 */
angular
    .module("app.services")
    .factory('User', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/users/:id', null,
                {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: false},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'},
                    'authenticated': {
                        url: appConfig.baseUrl + '/user/authenticated',
                        method: 'GET'
                    },
                    update: {
                        url: appConfig.baseUrl + '/users/:id',
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json; charset=UTF-8'},
                        transformRequest: function (data, headers) {
                            return angular.toJson(data);
                        }
                    },
                    'restore':  {
                        url: appConfig.baseUrl + '/users/:id/restore',
                        method: 'GET'
                    },
                    'trash':  {
                        url: appConfig.baseUrl + '/users/:id/trash',
                        method: 'DELETE'
                    },
                    'block': {
                        url :appConfig.baseUrl + '/users/block',
                        method: 'POST'
                    },
                    'checksBlocked': {
                        url :appConfig.baseUrl + '/users/checksBlocked',
                        method: 'POST'
                    },
                    'passwordEmail': {
                        url :appConfig.baseUrl + '/password/email',
                        method: 'POST'
                    },
                    'sendPasswordEmail': {
                        url :appConfig.baseAuthUrl + 'api/password/email',
                        method: 'POST'
                    },
                    'passwordReset': {
                        url :appConfig.baseAuthUrl + '/api/password/reset',
                        method: 'POST'
                    },
                    'logout': {
                        url :appConfig.baseUrl + '/oauth/revoke_token',
                        method: 'POST'
                    }
                }
            );

        }]
    );