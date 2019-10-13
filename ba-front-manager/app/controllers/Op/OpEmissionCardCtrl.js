/**
 * Emission create controller
 */
angular
    .module('managerApp')
    .controller('OpEmissionCardCtrl', ['$scope', '$rootScope', 'Card',
        function ($scope, $rootScope, Card) {

                $scope.cards = [];
                $scope.selectedCard = null;

                var init = function () {
                    listCards();
                };

                var listCards = function (search, limit) {
                    var oldCards = $scope.cards;

                    if (search && search.length >= 3) {
                        Card.query({limit: (limit ? limit : 50), search: search},
                            function success(data) {
                                if (data.data.length) {
                                    $scope.cards = data.data;
                                } else {
                                    $scope.cards = oldCards;
                                }
                            });
                    } else {
                        Card.query({limit: 30},
                            function success(data) {
                                $scope.cards = data.data;
                            });
                    }
                };
                $scope.listCards = listCards;

                init();
        }]);

