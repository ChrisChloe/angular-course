/**
 * Card edit controller
 */
angular
    .module('app.controllers')
    .controller('EmissionRequestEditCtrl', ['$scope', '$rootScope', '$state', '$filter', 'appConfig', 'EmissionRequest', 'Card', 'Stock', 'toastr',
        function ($scope, $rootScope, $state, $filter, appConfig, EmissionRequest, Card, Stock, toastr) {

            var requestId = $state.params.id;

            $scope.resource = EmissionRequest;

            $scope.cards  = [];

            $scope.request  = null;
            $scope.statuses  = appConfig.request_emission_status;

            var init = function () {

                EmissionRequest.get({id: requestId},
                    function success(data) {
                        $scope.request = data.data;
                        $scope.listCards();
                });
            };

            var getCard = function(request){
                if(request.card_id){
                    Card.get({id: request.card_id},
                        function success(data) {
                            if(!$scope.cards){
                                $scope.cards = [];
                            }
                            $scope.cards.push(data.data);
                        });
                }
            };

            var getStock = function(request){
                if(request.stock_id){
                    Stock.get({id: request.stock_id},
                        function success(data) {
                            if(!$scope.stocks){
                                $scope.stocks = [];
                            }
                            $scope.stocks.push(data.data);
                        });
                }
            };

            $scope.listCards = function(search, limit){
                var oldCards = $scope.cards;

                $rootScope.$emit("showLoadingScreen", true);

                if(search && search.length >= 3){
                    Card.query({limit: (limit ? limit : 50), search: search},
                        function success(data) {
                            $rootScope.$emit("showLoadingScreen", false);

                            getCard($scope.request);

                            if(data.data.length){
                                $scope.cards = data.data;
                            }else{
                                $scope.cards = oldCards;
                            }
                        });
                }else{
                    Card.query({limit: 30},
                        function success(data) {
                            $rootScope.$emit("showLoadingScreen", false);
                            $scope.cards = data.data;
                            getCard($scope.request);
                        });
                }
            };

            // $scope.onSelectCard = function($item, $model){
            //     console.log($item, $model);
            // };

            var lastStocks = null;
            var lastStockSearch = null;

            $scope.listStocks = function (search, limit){

                if($scope.request.company_id){
                    $rootScope.$emit("showLoadingScreen", true);

                    lastStockSearch = search;

                    var query = {
                        search:     search,
                        orderBy:    'provider.name',
                        sortedBy:   'asc',
                        company:    $scope.request.company_id,
                        limit:      limit ? limit : 100,
                        with_miles: 0
                    };

                    Stock.query(query,
                        function success(data) {
                            $rootScope.$emit("showLoadingScreen", false);

                            if(data.data && data.data.length){
                                $scope.stocks = data.data;
                                lastStocks = data.data;
                                getStock($scope.request);
                            }else{
                                $scope.stocks = lastStocks;
                            }
                        });
                }
            };

            $scope.onSelectStock = function(item){
                $scope.selectedStock = item;

                if(item.provider){
                    $scope.request.provider = item.provider;
                }

                $scope.request.stock_id = item.id;
            };

            $scope.save = function (request) {

                EmissionRequest.update({id: request.id}, request,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.emission-request');
                        }
                    });
            };

            init();
        }]);
