/**
 * SearchGroup show controller
 */
angular
    .module('app.controllers')
    .controller('SearchGroupShowCtrl', ['$scope', '$state', '$filter', 'SearchGroup',
        function ($scope, $state, $filter, SearchGroup) {
            $scope.title  = "Detalhes da Cotação Agrupada";
            $scope.SearchGroup = null;

            var init = function () {
                SearchGroup.get({id: $state.params.id},
                    function success(data) {
                        $scope.SearchGroup = data.data;
                    });
            };

            init();
        }]);
