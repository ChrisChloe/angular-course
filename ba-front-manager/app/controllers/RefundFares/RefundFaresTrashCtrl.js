/**
 * Markup Trash controller
 */
angular
    .module('app.controllers')
    .controller('RefundFaresTrashCtrl', ['$scope', '$state', 'appConfig', 'PriceMarkup', 'Company', 'toastr',
        function ($scope, $state, appConfig, PriceMarkup, Company, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = PriceMarkup;

            $scope.pricemarkupTypes = [];            
            $scope.pricemarkuptype_operation = [];
            $scope.pricemarkuptype_calculation = [];
            $scope.pricemarkups     = [];
            $scope.pricemarkup      = null;
            $scope.company     = null;

            var init = function () {
                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('trashed', true);
                $scope.pricemarkupTypes_operation = appConfig.PricemarkupTypes_operation;
                $scope.pricemarkupTypes_calculation = appConfig.PricemarkupTypes_calculation;

                $scope.$on("itemTrashed", function (event, markup) {
                    $scope.pricemarkups.push(pricemarkup);
                });
            };

            $scope.restore = function (markup) {

                PriceMarkup.restore({id: pricemarkup.id}, pricemarkup,
                    function success(data) {
                        $scope.$emit('itemRestored', pricemarkup);
                        if (!data.error){
                            $scope.pricemarkups.splice($scope.pricemarkups.indexOf(pricemarkup), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

