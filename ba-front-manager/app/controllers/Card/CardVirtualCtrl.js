/**
 * Card index controller
 */
angular
    .module('app.controllers')
    .controller('CardVirtualCtrl', ['$scope', '$rootScope', '$state', '$uibModal', 'appConfig', 'Card', 'CardType',
        function ($scope, $rootScope, $state, $uibModal, appConfig, Card, CardType) {

            $scope.resource       = Card;
            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.cards    = [];

            var init = function () {
                // $scope.filterCriteria.addParam('type', 1);
                // $scope.filterCriteria.orderBy = 'balance';
                // $scope.filterCriteria.sortedBy = 'desc';

                // CardType.virtual({limit:9999},{},
                //     function success(data) {
                //         $scope.types = data.data;
                //     });
            };

            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            $scope.delete = function (api) {
                //@Todo:delete
            };

            $scope.trash = function (api) {
                //@Todo:trash
            };

            /**
             * Adds card problem observation
             * @param card
             */
            $scope.addProblem = function (card) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/card/problem.html',
                    controller: 'CardProblemCtrl',
                    size: 'md',
                    resolve: {
                        card: card
                    }
                });

                modalInstance.result.then(function (response) {
                    if(response.remove){
                        $scope.cards.splice($scope.cards.indexOf(card), 1);
                        $scope.$emit('onRefresh');
                        $rootScope.$emit('onRefresh');
                        $scope.$broadcast('onRefresh');
                        $rootScope.$broadcast('onRefresh');
                    }
                });
            };

            init();
        }]);

