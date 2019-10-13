/**
 * Coupon index controller
 */
angular
    .module('app.controllers')
    .controller('CouponAgencyCtrl', ['$scope', '$state', 'appConfig', 'Coupon', 'toastr',
        function ($scope, $state, appConfig, Coupon, toastr) {

            $scope.resource = Coupon;

            $scope.coupons = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            var init = function () {
                $scope.$on("itemRestored", function (event, coupon) {
                    $scope.coupons.push(coupon);
                });

                $scope.filterCriteria.addParam('couponable_type', 'agency');
                $scope.filterCriteria.addParam('statusNot', '2');
            };

            $scope.inactivate = function (coupon) {
                var status = + !coupon.status;

                Coupon.update({id: coupon.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            coupon.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.coupon');
                        }
                    });
            };

            $scope.trash = function (coupon) {

                Coupon.trash({id: coupon.id}, coupon,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', coupon);
                            $scope.coupons.splice($scope.coupons.indexOf(coupon), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            init();
        }]);

