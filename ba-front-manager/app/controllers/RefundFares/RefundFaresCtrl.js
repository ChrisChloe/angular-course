/**
 * Refund Fares index controller
 */
angular
    .module('app.controllers')
    .controller('RefundFaresCtrl', ['$scope', '$state', 'appConfig', 'RefundFare', 'Company', 'toastr',
        function ($scope, $state, appConfig, RefundFare, Company, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = RefundFare;

            $scope.refundFare  = new RefundFare();
            $scope.refundFares = [];
            $scope.company     = null;

            var init = function () {
                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('orderBy', 'type_trip', true);
                $scope.filterCriteria.addParam('sortedBy','asc', true);

                $scope.refund_fares_Type_Trip     = appConfig.RefundFaresTypeTrip;
                $scope.refund_fares_sub_continent = appConfig.RefundsubContinents;

                Company.get({id: companyId},
                    function success(data) {
                        $scope.company = data.data;
                    });

                $scope.$on("itemRestored", function (event, refund_fare) {
                    $scope.refundFares.push(refund_fare);

                });
            };

            //Price Markup Add
            $scope.save = function (refundFare) {

                refundFare.company = $scope.company;
                refundFare.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.refundFares.push(data.data);
                            $scope.refundFare = new RefundFare();
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.trash = function (refundFare) {

                RefundFare.delete({id: refundFare.id}, refundFare,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', refundFare);
                            $scope.refundFares.splice($scope.refundFares.indexOf(refundFare), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            init();
        }]);

