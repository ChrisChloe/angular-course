/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('EmissionCreateCtrl', ['$scope', '$rootScope', '$location', 'appConfig', 'passenger', 'type', 'company', 'shipping', 'miles', 'Emission', 'Card', 'CardType', 'CardUse', 'Provider', 'Stock', 'toastr', '$uibModal', '$uibModalInstance',
        function ($scope, $rootScope, $location, appConfig, passenger, type, company, shipping, miles, Emission, Card, CardType, CardUse, Provider, Stock, toastr, $uibModal, $uibModalInstance) {

            $scope.hints = {
                baggage_price: 0,
                shipping_rate: 0,
                miles: 0,
                money: 0,
                confirmation_code: null,
                e_ticket: null,
                wintour_sale: null,
            };

            $scope.disabledCardsPagination = false;
            $scope.canSelectCard     = false;
            $scope.canFilterCards    = true;
            $scope.showCardSelection = false;

            $scope.with_no_miles  = false;
            $scope.min_miles      = null;

            $scope.showStockFilter = false;

            $scope.cards          = [];
            $scope.card_types     = [];
            $scope.card_flags     = [];
            $scope.card_companies = [];
            $scope.resource       = Card;

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.filterCriteria.addParam('from_view', '1');
            $scope.filterCriteria.addParam('limit', '20');
            $scope.filterCriteria.addParam('company', company.id);

            $scope.filterCriteria.sortedBy = 'ASC';
            $scope.filterCriteria.orderBy  = 'default_cards_order';

            $scope.search = {
                search: $location.search().search
            };

            //$scope.providerCards= [];
            $scope.selectedCard = null;
            var tempCard = null;

            $scope.passenger = passenger;
            $scope.type      = type;
            $scope.company   = company;
            $scope.shipping  = shipping;
            $scope.sending   = false;

            $scope.emission  = new Emission({
                passenger_id:  passenger.id,
                flight_type:   0,
                type_trip:     type,
                payment_type:  1,
                card_type:  1,
                shipping_rate: shipping,
                miles:         miles || 0,
                miles_price:   0,
                debit_on_stock: miles > 0,
                sale_date:     moment().format('DD/MM/YYYY')
            });

            $scope.stocks        = [];
            $scope.selectedStock = null;

            var init = function () {
                //listCards();

                Card.query({limit: 1},
                    function success(data) {
                        if(data.data.length && data.data[0].uses){
                            data.data[0].uses.forEach(function(use){
                                $scope.card_companies.push(use.company);
                            });
                        }
                    });

                CardType.query({limit:9999},{},
                    function success(data) {
                        $scope.card_types = data.data;
                    });

                Emission.calculatePrices({'type':type, 'passenger_id':passenger.id},
                    function success(data) {
                        $scope.emission.shipping_rate  = data.data.shipping_rate;
                        $scope.emission.miles          = data.data.miles;
                        $scope.emission.debit_on_stock = data.data.miles > 0;
                        $scope.emission.miles_price    = data.data.price;
                        $scope.emission.baggage_price  = data.data.baggage_price;
                        $scope.emission.observation    = data.data.observation;

                        $scope.hints.wintour_sale      = data.data.wintour_sale;
                        $scope.hints.baggage_price     = data.data.emission_request_baggage_price;
                        $scope.hints.shipping_rate     = data.data.emission_request_money;
                        $scope.hints.miles             = data.data.emission_request_miles;
                        $scope.hints.confirmation_code = data.data.confirmation_code;
                        $scope.hints.e_ticket          = data.data.e_ticket;
                        $scope.hints.observation       = data.data.observation;
                        $scope.hints.stock_id          = data.data.stock_id;
                        $scope.hints.card_id           = data.data.card_id;

                        if ($scope.hints.card_id) initListCards(data.data.card_id);
                        if ($scope.hints.stock_id) initListStocks(data.data.stock_id);
                    }
                );
            };

            $scope.removeInvalidCharactersFromLocator = function(emission){
                if(emission.confirmation_code){
                    emission.confirmation_code = emission.confirmation_code.replace(/\W/g, '');
                }
            };

            $scope.save = function (emission) {

                $scope.sending = true;
                emission.debit_on_stock = emission.debit_on_stock ? 1 : 0;

                emission.confirmation_code = emission.confirmation_code.replace(/\W/g,'');
                emission.e_ticket          = emission.e_ticket.replace(/\W/g,'');

                if(emission.card_type == 1){
                    emission.card_id = null;
                    emission.card = null;
                }

                emission.$save(
                    function success(data) {
                        if (!data.error) {
                            //Return To Add List
                            $uibModalInstance.close(data.data);
                            toastr.success("Salvo!");
                        }else{
                            $scope.sending = false;
                            $uibModalInstance.close();
                            toastr.error(data.message);
                        }

                    }
                );
            };

            $scope.onSelectStock = function(item) {
                $scope.selectedStock = item;

                if(item.provider){
                    $scope.emission.provider_id = item.provider.id;
                    $scope.emission.provider = item.provider;
                }

                $scope.emission.stock_id = item.id;

                $scope.canSelectCard = true;
            };

            $scope.onSelectProvider = function(item){
                $scope.selectedStock = null;
                $scope.emission.stock_id = null;
                $scope.selectedProvider = item;
                $scope.emission.provider = item;

                $scope.canSelectCard = true;
            };

            $scope.onSelectCard = function(item){
                $scope.emission.card_type = '0';
                $scope.selectedCard = item;
            };

            var lastStocks = null;
            var lastStockSearch = null;

            $scope.listStocks = function (search, limit) {

                $rootScope.$emit("showLoadingScreen", true);

                lastStockSearch = search;

                var query = {
                    search:     search,
                    orderBy:    'provider.name',
                    sortedBy:   'asc',
                    company:    $scope.company.id,
                    limit:      limit ? limit : 100
                };

                query.with_miles = $scope.with_no_miles ? 0 : 1;

                if($scope.min_miles !== null){
                    query.min_miles  = $scope.min_miles;
                }

                Stock.query(query,
                    function success(data) {
                        $rootScope.$emit("showLoadingScreen", false);

                        if(data.data && data.data.length){
                            $scope.stocks = data.data;
                            lastStocks = data.data;
                        }else{
                            $scope.stocks = lastStocks;
                        }
                    });
            };

            var initListStocks = function (id) {

                console.log('initListStocks');

                $rootScope.$emit("showLoadingScreen", true);

                var query = {
                    stock_id: id,
                    company:  $scope.company.id,
                };

                Stock.query(query,
                    function success(data) {
                    console.log('initListStocks end');
                    console.log(data);
                        $rootScope.$emit("showLoadingScreen", false);

                        if(data.data && data.data.length){
                            $scope.stocks = data.data;
                            lastStocks = data.data;
                            $scope.onSelectStock($scope.stocks[0]);
                        }
                    });
            };

            var initListCards = function (id) {

                console.log('initListCards');

                Card.query({card_id: id},
                    function success(data) {
                        if(data.data && data.data.length){
                            $scope.emission.card = data.data[0];
                            $scope.emission.card_id = data.data[0].id;
                            $scope.onSelectCard(data.data[0]);
                        }
                    });
            };

            $scope.listProviders = function (search, limit){

                $rootScope.$emit("showLoadingScreen", true);

                var query = {
                    search:     search,
                    orderBy:    'name',
                    sortedBy:   'asc',
                    type:       '2',
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

            $scope.refreshStocks = function (){
                $scope.listStocks(lastStockSearch);
            };

            $scope.cardIsFromProvider = function(card, provider){
                if(!card || !card.providers || !provider){
                    return false;
                }

                return card.providers.some(function(id){
                    return id == provider.id;
                });
            };

            $scope.groupCardsByTitular = function(card){
                if($scope.selectedStock && $scope.selectedStock.provider){
                    var isFromProvider = $scope.cardIsFromProvider(card, $scope.selectedStock.provider);

                    if(isFromProvider){
                        return 'Do Fornecedor';
                    }

                    //return card.titular.charAt(0).toUpperCase();
                }

                return 'Outros';
            };

            $scope.orderCardsFilter = function(groups) {
                return groups.sort(function(a, b){
                    return a.name>b.name;
                });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.getTypeTitle = function (type) {
                switch (type) {
                    case 0:
                        return "Ida";
                    case 1:
                        return "Volta";
                    case 2:
                        return "Ida e Volta";
                }
            };

            $scope.$watch('emission.debit_on_stock', function(newValue, oldValue) {
                $scope.listStocks();
            });

            $scope.close = function () {
                $uibModalInstance.close();
            };

            //Card modal part
            var updateCard = function(card){
                Card.get({id: card.id},
                    function success(response) {
                        if(response.data && response.data.uses){
                            card.uses = response.data.uses;
                        }
                    });
            };

            //$scope.showCardMessage = function () {
            //    toastr.success("Liberar/Trocar cartão antes de escolher outro!");
            //};

            $scope.hideShowCardSelection = function () {
                $scope.emission.card_type = 0;
                $scope.showCardSelection = !$scope.showCardSelection;
            };

            $scope.showingCard = false;
            var usedCardIds = [];
            $scope.selectCard = function (card) {
                usedCardIds.push(card.id);
                $scope.showingCard = true;
                $scope.canFilterCards = false;

                if(card.open_detail){
                    $scope.disabledCardsPagination = false;
                    $scope.emission.card = null;
                    $scope.emission.card_id = null;
                }else{
                    $scope.disabledCardsPagination = true;
                    $scope.emission.card = card;
                    $scope.selectedCard = card;
                    $scope.emission.card_id = card.id;

                    var cardUse = new CardUse({
                        type: 0,
                        status: 0,
                        card_id: card.id,
                        company_id: $scope.company.id,
                        observation: null
                    });
                    cardUse.$save(
                        function success(data) {
                            updateCard(card);
                            if (!data.error) {
                                updateCard(card);
                                toastr.success("Uso registrado!");
                            }else{
                                toastr.success("Falha ao registrar!");
                            }
                        }
                    );
                }

                card.open_detail = !card.open_detail;
            };

            $scope.changeCard = function (card) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/emission/modals/card-use.html',
                    controller: 'EmissionCardUseCtrl',
                    size: 'sm',
                    resolve: {
                        card_id: card.id,
                        company_id: company.id
                    }
                });

                modalInstance.result.then(function (data) {
                    updateCard(card);
                    if(data && data.success){
                        $scope.emission.card = null;
                        $scope.emission.card_id = null;
                        $scope.showingCard = false;
                        card.open_detail = false;
                        card.used = true;
                        $scope.canFilterCards = true;
                        $scope.disabledCardsPagination = false;
                    }
                });
            };

            $scope.filter = function(search){

                if(!$scope.canFilterCards){
                    toastr.warning("Troque cartão para liberar pesquisa!");
                    return;
                }

                search.from_view = '1';
                search.company   = company.id;
                search.limit = 20;

                $scope.$broadcast('onSearch', search);
            };

            $scope.$watch('cards', function(newCards) {
                if(newCards){
                    newCards.forEach(function(card){
                        if(card.id != $scope.emission.card_id && usedCardIds.indexOf(card.id) != -1){
                            card.used = true;
                        }
                    });
                }
            }, true);

            var wintourSaleClicks = 0;

            $scope.fillEmission = function(hintField, emissionField) {

                if (hintField === 'wintour_sale' && wintourSaleClicks > 0) {
                    $scope.emission['sale'] = $scope.hints[hintField] + wintourSaleClicks;

                } else {
                    $scope.emission[emissionField] = $scope.hints[hintField];
                }

                if (hintField === 'wintour_sale') wintourSaleClicks++;
            };

            init();
        }]);

