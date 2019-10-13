/**
 * Card statement controller
 */
angular
    .module('app.controllers')
    .controller('CardStatementCtrl', ['$scope', '$state', '$filter', '$httpParamSerializer', 'appConfig', 'toastr', 'Card', 'Emission',
        function ($scope, $state, $filter, $httpParamSerializer, appConfig, toastr, Card, Emission) {
            var cardId = $state.params.id;

            $scope.emissions = [];
            //Custom
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource  = Card;

            $scope.card  = null;
            $scope.total = 0.0;

            $scope.liquidate = {
                ids: [],
                count: 0,
                total: 0.0
            };

            /**
             *
             */
            var init = function () {
                load();
                $scope.filterCriteria.addParam('card', cardId);
            };

            /**
             * Carregar ou recarregar cartão
             */
            var load = function(){
                Card.get({id: cardId},
                    function success(response) {
                        $scope.card = response.data;
                    });

                $scope.$broadcast('onRefresh');
            };

            /**
             *
             * @param search
             */
            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            /**
             *
             */
            $scope.changeCallback = function(){
                $scope.total = calculateTotal($scope.emissions);
            };

            /**
             * Calcular total da liquidação
             * 
             * @param emissions
             * @returns {*}
             */
            var calculateTotal = function(emissions){
                return emissions.reduce(function(total, emission){
                    return total + parseFloat(emission.shipping_rate) + parseFloat(emission.baggage_price);
                }, 0);
            };

            /**
             * Liquidar emnissoes selecionadas
             * @param ids
             */
            $scope.liquidateEmissions = function(ids){
                Emission.liquidate({'emissions[]':ids}, {},
                    function success(response) {
                        if(!response.error){
                            toastr.success('Liquidada com sucesso!');
                            load();
                        }else{
                            toastr.error('Não foi possível liquidar!');
                            load();
                        }
                    });
            };

            /**
             * Estornar emnissoes selecionadas
             * @param ids
             */
            $scope.reverseEmissions = function(ids){
                Emission.reverse({'emissions[]':ids}, {},
                    function success(response) {
                        if(!response.error){
                            toastr.success('Estornado com sucesso!');
                            load();
                        }else{
                            toastr.error('Não foi possível estornar!');
                            load();
                        }
                    });
            };

            /**
             * Selecionar todas de uma so vez
             *
             * @param emissions
             * @param selectedAll
             */
            $scope.selectAll = function(emissions, selectedAll){
                emissions.forEach(function (emission) {
                    if(emission.liquidated_at || emission.liquidator_id){
                        emission.selected = false;
                    }else{
                        emission.selected = selectedAll;
                    }
                });
            };

            /**
             * Monitora alterações de seleções de emissoes e atualiza contadores de qtd e total de preço
             */
            $scope.$watch('emissions|filter:{selected:true}', function (emissions) {

                $scope.liquidate.count = emissions.length;
                $scope.liquidate.total = calculateTotal(emissions);
                $scope.liquidate.ids   = emissions.map(function(statement) {
                    return statement.id;
                });
            }, true);

            init();
        }]);
