/**
 * PriceMarkup index controller
 */
angular
    .module('app.controllers')
    .controller('PriceMarkupCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'PriceMarkup', 'Company', 'toastr',
        function ($scope, $rootScope, $state, appConfig, PriceMarkup, Company, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria  = appConfig.filterCriteria();
            $scope.resource        = PriceMarkup;
            $scope.company         = null;
            $scope.$parent.company = null;
            $scope.price_markups   = [];
            $scope.priceMarkup     = new PriceMarkup();

            //$scope.pricemarkuptype_operation = [];
            //$scope.pricemarkuptype_calculation = [];

            var init = function () {

                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('orderBy', 'type', true);
                $scope.filterCriteria.addParam('sortedBy','asc', true);

                $scope.priceMarkupTypes             = appConfig.PricemarkupTypes;
                $scope.priceMarkupTypes_operation   = appConfig.PricemarkupTypes_operation;
                $scope.priceMarkupTypes_calculation = appConfig.PricemarkupTypes_calculation;

                Company.get({id: companyId},
                    function success(data) {
                        $scope.$parent.company = data.data;
                        $scope.company = data.data;
                    });

                $scope.$on("itemRestored", function (event, markup) {
                    $scope.price_markups.push(markup);
                });
            };

            //Price Markup Add
            $scope.save = function (priceMarkup) {
               
                priceMarkup.company = $scope.company;

                if(priceMarkup.type_calculation == 1){
                    priceMarkup.value = priceMarkup._value * 100;
                }else{
                    priceMarkup.value = priceMarkup._value;
                }

                if(priceMarkup.expiration_date){
                    priceMarkup.expiration = moment(priceMarkup.expiration_date).format('YYYY-MM-DD');
                }

               priceMarkup.$save(

                    function success(data) {
                        if (!data.error) {
                            $scope.price_markups.push(data.data);
                            priceMarkup = new PriceMarkup();
                            priceMarkup.type             = 1;
                            priceMarkup.type_calculation = 1;
                            priceMarkup.type_operation   = 1;

                            $scope.priceMarkup = priceMarkup;
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.trash = function (priceMarkup) {

                PriceMarkup.delete({id: priceMarkup.id}, priceMarkup,
                    function success(data) {
                      
                        if (!data.error){
                            $scope.price_markups.splice($scope.price_markups.indexOf(priceMarkup), 1);
                            toastr.success("Enviado para Lixeira!");
                            $rootScope.$broadcast('itemTrashed', priceMarkup);
                        }
                    });
            };

            init();
        }]);

