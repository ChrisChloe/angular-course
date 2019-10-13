/**
 * Emission edit controller
 */
angular
    .module('app.controllers')
    .controller('EmissionEditCtrl', ['$scope', '$rootScope', '$state', '$filter', 'Emission', 'Stock', 'Provider', 'Card', 'toastr',
        function ($scope, $rootScope, $state, $filter, Emission, Stock, Provider, Card, toastr) {

            $scope.title    = "Editar Emissão";
            $scope.emission = null;
            $scope.selectedCard = null;
            $scope.provider_type = 0;

            $scope.stocks        = [];
            $scope.selectedStock = null;

            var init = function () {
                listCards();

                Emission.get({id: $state.params.id}, function (data) {
                    $scope.emission = data.data;
                    $scope.emission.sale_date = moment($scope.emission.sale_date).format('DD/MM/YYYY');

                    $scope.provider_type = $scope.emission.provider_id ? 1 : 0;
                    $scope.emission.provider_name = $scope.emission.provider_id ? '' : $scope.emission.provider_name;

                    $scope.emission.debit_on_stock = $scope.emission.stock_id ? '1' : '0';

                    getCard(data.data);
                    getProvider(data.data);
                    listStocks();
                });
            };

            $scope.save = function (emission) {

                emission.sale_date = moment(emission.sale_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

                $scope.sending = true;

                if(emission.debit_on_stock === 0 || emission.debit_on_stock === '0'){
                    emission.stock_id = null;
                }

                if(emission.card_type == 1){
                    emission.card_id = null;
                    emission.card = null;
                }

                Emission.update({id: emission.id}, emission,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.emission');
                        }else{
                            toastr.error("Impossível editar registro!");
                        }
                    });
            };

            var listCards = function(search, limit){
                var oldCards = $scope.cards;

                if(search && search.length >= 3){
                    Card.query({limit: (limit ? limit : 50), search: search},
                        function success(data) {
                            if(data.data.length){
                                $scope.cards = data.data;
                            }else{
                                $scope.cards = oldCards;
                            }
                        });
                }else{
                    Card.query({limit: 30},
                        function success(data) {
                            $scope.cards = data.data;
                        });
                }

                getCard($scope.emission);
            };
            $scope.listCards = listCards;

            var getCard = function(emission){
                if(emission && emission.card_id){
                    Card.get({id: emission.card_id},
                        function success(data) {
                            if(!$scope.cards){
                                $scope.cards = [];
                            }
                            $scope.cards.push(data.data);
                            $scope.selectedCard = data.data;
                        });
                }
            };

            $scope.onSelectCard = function(item){
                $scope.selectedCard = item;
            };

            var lastStocks = null;
            var listStocks = function (search, limit){

                if($scope.emission){
                    var companyId = $scope.emission.flight.company_id;

                    Stock.query({limit:(limit ? limit : 50), with_miles:0, search:search, orderBy:'provider.name', sortedBy:'asc', company:companyId},
                        function success(data) {
                            if(data.data && data.data.length){
                                $scope.stocks = data.data;
                                lastStocks = data.data;
                            }else{
                                $scope.stocks = lastStocks;
                            }
                        });
                }
            };
            $scope.listStocks = listStocks;

            $scope.onSelectStock = function(item){
                $scope.selectedStock = item;

                if(item.provider){
                    $scope.emission.provider_id = item.provider.id;
                }
            };

            $scope.listProviders = function (search, limit){

                $rootScope.$emit("showLoadingScreen", true);

                var query = {
                    search:     search,
                    orderBy:    'name',
                    sortedBy:   'asc',
                    limit:      limit ? limit : 100
                };

                Provider.query(query,
                    function success(data) {
                        $rootScope.$emit("showLoadingScreen", false);

                        if(data.data && data.data.length){
                            $scope.providers = data.data;
                        }
                    });
            };

            var getProvider = function(emission){
                if(emission){
                    var options = {};
                    if(emission.stock_id){
                        options.id = emission.stock_id;
                    }else{
                        options.provider_id = emission.provider_id;
                    }

                    Stock.get(options,
                        function success(data) {
                            if(!$scope.stocks){
                                $scope.stocks = [];
                            }
                            $scope.stocks.push(data.data);
                            $scope.selectedStock = data.data;
                        });
                }
            };

            init();
        }]);
