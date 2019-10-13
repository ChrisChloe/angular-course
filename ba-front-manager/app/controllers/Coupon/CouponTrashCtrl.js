/**
 * Coupon index controller
 */
angular
    .module('app.controllers')
    .controller('CouponTrashCtrl', ['$scope', '$state', 'appConfig', 'Coupon', 'toastr',
        function ($scope, $state, appConfig, Coupon, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Coupon;

            $scope.coupons = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, coupon) {
                    $scope.coupons.push(coupon);
                });
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

            $scope.restore = function (coupon) {

                Coupon.restore({id: coupon.id}, coupon,
                    function success(data) {
                        $scope.$emit('itemRestored', coupon);
                        if (!data.error){
                            $scope.coupons.splice($scope.coupons.indexOf(coupon), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

