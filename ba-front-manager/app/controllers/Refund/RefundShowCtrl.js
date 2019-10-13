/**
 * Refund show controller
 */
angular
    .module('app.controllers')
    .controller('RefundShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Provider', 'Emission', 'toastr',
        function ($scope, $state, appConfig, $filter, Provider, Emission, toastr) {

            var providerId  = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Emission;

            $scope.provider = null;
            $scope.emissions = [];

            $scope.total = 0.0;

            $scope.liquidate = {
                ids: [],
                count: 0,
                total: 0.0
            };

            $scope.liquidating = false;

            /**
             * Carregar ou recarregar cartão
             */
            var load = function(){
                Provider.get({id: providerId},
                    function success(data) {
                        $scope.provider = data.data;
                    });

                $scope.$broadcast('onRefresh');
            };

            var init = function () {
                load();

                $scope.filterCriteria.addParam('provider', providerId);
                $scope.filterCriteria.addParam('is_refund', 1);
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
                $scope.liquidating = true;
                Emission.liquidateProvider({'emissions[]':ids}, {},
                    function success(response) {
                        if(!response.error){
                            $scope.liquidating = false;
                            toastr.success('Liquidada com sucesso!');
                            load();
                        }else{
                            $scope.liquidating = false;
                            toastr.error('Não foi possível liquidar!');
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
