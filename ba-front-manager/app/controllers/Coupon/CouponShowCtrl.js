/**
 * Coupon show controller
 */
angular
    .module('app.controllers')
    .controller('CouponShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Coupon', 'toastr',
        function ($scope, $state, appConfig, $filter, Coupon, toastr) {
            var couponId  = $state.params.id;

            $scope.coupon = null;
            $scope.title = 'Detalhes Cupom';

            var init = function () {

                Coupon.get({id: couponId},
                    function success(data) {
                        $scope.coupon = data.data;
                    });
            };

            init();
        }]);
