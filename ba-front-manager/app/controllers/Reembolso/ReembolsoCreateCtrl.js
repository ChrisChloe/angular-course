/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('ReembolsoCreateCtrl', ['$scope', 'passenger', 'type', 'company', 'shipping', 'miles', 'Emission', 'Card', 'Stock', 'toastr', '$uibModalInstance',
        function ($scope, passenger, type, company, shipping, miles, Emission, Card, Stock, toastr, $uibModalInstance) {

            $scope.cards        = [];
            //$scope.providerCards= [];
            $scope.selectedCard = null;
            $scope.provider_type = 0;
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
                shipping_rate: shipping,
                miles:         miles || 0,
                sale_date:     moment().format('DD/MM/YYYY')
            });

            $scope.stocks        = [];
            $scope.selectedStock = null;

            var init = function () {
                listCards();
            };

            var listCards = function(){
                Card.query({limit: 99999},
                    function success(data) {
                        $scope.cards = data.data;
                    });
            };

            //$scope.shippingRateChange = function(rate){
            //    if($scope.selectedCard && $scope.selectedCard.balance < rate){
            //        $scope.emission.card_id = null;
            //        tempCard                = $scope.selectedCard;
            //        $scope.selectedCard     = null;
            //    }else if($scope.selectedCard === null){
            //        $scope.selectedCard     = tempCard;
            //        $scope.emission.card_id = tempCard.id;
            //    }
            //};

            $scope.save = function (emission) {

                $scope.sending = true;

                if($scope.provider_type === 0 || $scope.provider_type === '0'){
                    emission.provider_id = null;
                }else{
                    emission.provider_name = null;
                    emission.provider_code = null;
                }

                if(emission.card_type == 1){
                    emission.card_id = null;
                    emission.card = null;
                }

                emission.$save(
                    function success(data) {
                        if (!data.error) {
                            //Return To Add List
                            $uibModalInstance.close(data.data);
                            //$uibModalInstance.dismiss('cancel');
                            toastr.success("Salvo!");
                        }else{
                            $scope.sending = false;
                        }

                    }
                );
            };

            $scope.onSelectStock = function(item){
                $scope.selectedStock = item;

                if(item.provider){
                    $scope.emission.provider = item.provider;
                }
                listCards();
            };

            $scope.onSelectCard = function(item){
                $scope.selectedCard = item;
            };

            var lastStocks = null;
            $scope.listStocks = function (search, limit){
                Stock.query({limit:(limit?limit:50), search:search, orderBy:'provider.name', sortedBy:'asc', company:$scope.company.id},
                    function success(data) {
                        if(data.data && data.data.length){
                            $scope.stocks = data.data;
                            lastStocks = data.data;
                        }else{
                            $scope.stocks = lastStocks;
                        }
                    });
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

            init();
        }]);

