/**
 * TravelMarkup index controller
 */
angular
    .module('app.controllers')
    .controller('TravelMarkupCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'TravelMarkup', 'Company', 'Airport', 'toastr',
        function ($scope, $rootScope, $state, appConfig, TravelMarkup, Company, Airport, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria  = appConfig.filterCriteria();
            $scope.resource        = TravelMarkup;
            $scope.company         = null;
            $scope.$parent.company = null;
            $scope.travel_markups  = [];
            $scope.travelMarkup    = new TravelMarkup();
            $scope.newPrice        = null;
            $scope.travelMarkupsSelected = [];

            $scope.airports    = [];

            var init = function () {

                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('orderBy', 'id', true);
                $scope.filterCriteria.addParam('sortedBy', 'asc', true);

                Company.get({id: companyId},
                    function success(data) {
                        $scope.$parent.company = data.data;
                        $scope.company = data.data;
                    });

                $scope.$on("itemRestored", function (event, markup) {
                    $scope.travel_markups.push(markup);
                });
            };

            $scope.filter = function (search) {
                $scope.$broadcast('onSearch', search);
            };

            //Price Markup Add
            $scope.save = function (travelMarkup) {
               
                travelMarkup.company_id = $scope.company.id;
                travelMarkup.type_calculation = 1;
                travelMarkup.type_operation   = 1;

                travelMarkup.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.travel_markups.push(data.data);

                            travelMarkup = new TravelMarkup();
                            travelMarkup.type_calculation = 1;
                            travelMarkup.type_operation   = 1;
                            travelMarkup.origin_id        = null;
                            travelMarkup.destination_id   = null;

                            $scope.travelMarkup = travelMarkup;
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.trash = function (travelMarkup) {

                TravelMarkup.delete({id: travelMarkup.id}, travelMarkup,
                    function success(data) {
                      
                        if (!data.error){
                            $scope.travel_markups.splice($scope.travel_markups.indexOf(travelMarkup), 1);
                            toastr.success("Enviado para Lixeira!");
                            $rootScope.$broadcast('itemTrashed', travelMarkup);
                        }
                    });
            };

            $scope.searchAirport = function(search){
                if(search && search.length){
                    Airport.query({limit: 20, search: search, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.airports = response.data;
                        }
                    );
                }else{
                    Airport.query({limit: 20, orderBy:'title', sortedBy:'DESC'}, {},
                        function success(response) {
                            $scope.airports = response.data;
                        }
                    );
                }
            };

            $scope.$watch('travel_markups|filter:{selected:true}', function (markups) {
                $scope.travelMarkupsSelected = $scope.travel_markups.filter(function(travelMarkup) {
                    return !!travelMarkup.selected;
                });
            }, true);

            $scope.selectAll = function() {
                $scope.selectedAll = !$scope.selectedAll;
                $scope.travel_markups.forEach(function(travelMarkup) {
                    travelMarkup.selected = $scope.selectedAll;
                });
            };

            $scope.updatePrices = function(newPrice) {
                if(newPrice <= 0){
                    return toastr.error("Preço é obrigatório");
                }

                var ids = $scope.travelMarkupsSelected.map(function(travelMarkup) {
                    return travelMarkup.id;
                });

                var data = {
                    travel_markups: ids,
                    value: newPrice
                };

                TravelMarkup.updatePrices({}, data,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Trechos atualizados!");
                            $scope.$broadcast('onRefresh');
                        }
                    });
            };

            init();
        }]);

