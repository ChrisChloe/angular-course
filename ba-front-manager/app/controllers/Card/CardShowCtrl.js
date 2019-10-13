/**
 * Card show controller
 */
angular
    .module('app.controllers')
    .controller('CardShowCtrl', ['$scope', '$state', '$filter', 'appConfig', 'Card', 'Provider', 'CardObservation',
        function ($scope, $state, $filter, appConfig, Card, Provider, CardObservation) {
            var cardId = $state.params.id;

            $scope.title = "Detalhes Cartão";
            $scope.card  = null;

            //Custom
            $scope.filterObservationCriteria = appConfig.filterCriteria();
            $scope.filterCriteria    = appConfig.filterCriteria();

            $scope.CardObservation    = CardObservation;
            $scope.resource           = Provider;

            $scope.observations = [];
            $scope.providers    = [];

            var init = function () {
                Card.get({id: cardId},
                    function success(response) {
                        $scope.card = response.data;
                    });

                $scope.filterObservationCriteria.addParam('card', cardId);
                $scope.filterCriteria.addParam('card', cardId);
            };

            init();
        }]);
