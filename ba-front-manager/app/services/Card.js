/**
 * Card Service
 */
angular
    .module("app.services")
    .service('Card', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/cards/:id', null,
                {
                    'get':          {method: 'GET'},
                    'save':         {method: 'POST'},
                    'query':        {method: 'GET', isArray: false},
                    'remove':       {method: 'DELETE'},
                    'delete':       {method: 'DELETE'},
                    'update':       {method: 'PUT'},
                    'addComment':   {
                        method: 'POST',
                        url: appConfig.baseUrl + '/cards/add-comment'
                    },
                    'emissions':   {
                        method: 'GET',
                        url: appConfig.baseUrl + '/card-emissions'
                    },
                    'cep':  {
                        url: appConfig.baseUrl + '/agencies/cep/:cep',
                        method: 'GET'
                    },
                    'problem':  {
                        url: appConfig.baseUrl + '/card-problem',
                        method: 'GET'
                    },
                    'statement':  {
                        url: appConfig.baseUrl + '/card-statement',
                        method: 'GET'
                    },

                    'active': {
                        url: appConfig.baseUrl + '/cards/actives',
                        method: 'GET'
                    },
                    'problem': {
                        url: appConfig.baseUrl + '/cards/problems',
                        method: 'GET'
                    },
                    'virtual': {
                        url: appConfig.baseUrl + '/cards/virtuals',
                        method: 'GET'
                    },
                    'inactive': {
                        url: appConfig.baseUrl + '/cards/inactives',
                        method: 'GET'
                    }


                    
                });
        }]);
