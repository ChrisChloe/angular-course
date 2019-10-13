/**
 * Company show controller
 */
angular
    .module('app.controllers')
    .controller('CompanyShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Company', 'toastr', 'TravelMarkup', 'PriceMarkup', 'Markup', 'Adjustment', 'RefundFare',
        function ($scope, $state, appConfig, $filter, Company, toastr, TravelMarkup, PriceMarkup, Markup, Adjsutment, RefundFare) {
            var companyId = $state.params.id;
            $scope.company = null;
            $scope.title = 'Detalhes Companhia';

            $scope.travelMExist = false;
            $scope.priceMExist = false;
            $scope.markupExist = false;
            $scope.adjustmentExist = false;
            $scope.refundFExist = false;

            var init = function () {
                Company.get({ id: companyId },
                    function success(data) {
                        $scope.company = data.data;
                    });

                Markup.query({ company: companyId, limit: 1 },
                    function success(data) {
                        if (data.data.length >= 1) {
                            $scope.markupExist = true;
                        }
                    });
                TravelMarkup.query({ company: companyId, limit: 1 },
                    function success(data) {
                        if (data.data.length >= 1) {
                            $scope.travelMExist = true;
                        }
                    });
                PriceMarkup.query({ company: companyId, limit: 1 },
                    function success(data) {
                        if (data.data.length >= 1) {
                            $scope.priceMExist = true;
                        }
                    });

                Adjsutment.query({ company: companyId, limit: 1 },
                    function success(data) {
                        if (data.data.length >= 1) {
                            $scope.adjustmentExist = true;
                        }
                    });
                RefundFare.query({ company: companyId, limit: 1 },
                    function success(data) {
                        if (data.data.length >= 1) {
                            $scope.refundFExist = true;
                        }
                    });



            };


            init();
        }]);
