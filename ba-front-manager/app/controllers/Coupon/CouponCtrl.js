/**
 * Coupon index controller
 */
angular
    .module('app.controllers')
    .controller('CouponCtrl', ['$scope', '$state', 'appConfig', 'Coupon', 'toastr',
        function ($scope, $state, appConfig, Coupon, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Coupon;

            $scope.coupons = [];

            var init = function () {
                $scope.filterCriteria.addParam('release', true);
            };

            $scope.delete = function (coupon) {
                Coupon.delete({id: coupon.id}, coupon,
                    function success(data) {
                        if (!data.error){
                            $scope.coupons.splice($scope.coupons.indexOf(coupon), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.release = function (coupon) {
                Coupon.release({id: coupon.id}, coupon,
                    function success(data) {
                        if (!data.error){
                            $scope.coupons.splice($scope.coupons.indexOf(coupon), 1);
                            toastr.success("Liberado!");
                        }
                    });
            };

            init();
        }]);

