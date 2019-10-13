/**
 * Card Trash controller
 */
angular
    .module('app.controllers')
    .controller('CardTrashCtrl', ['$scope', '$state', 'appConfig', 'Card', 'CardType',
        function ($scope, $state, appConfig, Card, CardType) {

            $scope.resource       = Card;
            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.cards    = [];

            var init = function () {
                // $scope.filterCriteria.addParam('status', 0);
                // $scope.filterCriteria.addParam('typeNot', 1);

                // CardType.query({limit:9999},{},
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

            init();
        }]);

