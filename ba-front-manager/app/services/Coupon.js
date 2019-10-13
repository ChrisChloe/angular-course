/**
 * Coupon Service
 */
angular
    .module("app.services")
    .service('Coupon', ['$resource', 'appConfig',
        function ($resource, appConfig) {

            return $resource(appConfig.baseUrl + '/coupons/:id', null,
                {
                    'get':    {method: 'GET'},
                    'save':   {method: 'POST'},
                    'query':  {method: 'GET', isArray: false},
                    'update': {method: 'PUT'},
                    'trash':  {
                        url: appConfig.baseUrl + '/coupons/:id/trash',
                        method: 'DELETE'
                    },
                    'delete':   {
                        method: 'DELETE',
                        url: appConfig.baseUrl + '/coupons/:id/trash'
                    },
                    'restore':  {
                        url: appConfig.baseUrl + '/coupons/:id/restore',
                        method: 'GET'
                    },
                    'release':  {
                        url: appConfig.baseUrl + '/coupons/:id/release',
                        method: 'GET'
                    }
                });



        }]);
