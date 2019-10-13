/**
 * Markup Trash controller
 */
angular
    .module('app.controllers')
    .controller('PriceMarkupTrashCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'PriceMarkup', 'Company', 'toastr',
        function ($scope, $rootScope, $state, appConfig, PriceMarkup, Company, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = PriceMarkup;
            $scope.price_markups   = [];

            $scope.pricemarkupTypes = [];            
            $scope.priceMarkup      = null;
            $scope.company          = null;
            $scope.$parent.company  = null;

            var init = function () {

                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('trashed', true);
                $scope.priceMarkupTypes_operation = appConfig.PricemarkupTypes_operation;
                $scope.priceMarkupTypes_calculation = appConfig.PricemarkupTypes_calculation;

                Company.get({id: companyId},
                    function success(data) {
                        $scope.$parent.company = data.data;
                        $scope.company = data.data;
                    });

                $scope.$on("itemTrashed", function (event, priceMarkup) {
                    $scope.price_markups.unshift(priceMarkup);
                });
            };

            $scope.restore = function (priceMarkup) {

                PriceMarkup.restore({id: priceMarkup.id}, priceMarkup,
                    function success(data) {
                        if (!data.error){
                            $scope.price_markups.splice($scope.price_markups.indexOf(priceMarkup), 1);
                            toastr.success("Restaurado!");
                        }
                        $rootScope.$broadcast('itemRestored', priceMarkup);
                    });
            };

            init();
        }]);

