/**
 * Search show controller
 */
angular
    .module('app.controllers')
    .controller('SearchShowCtrl', ['$scope', '$state', '$filter', 'Search',
        function ($scope, $state, $filter, Search) {
            $scope.title  = "Detalhes Cotação";
            $scope.search = null;

            var init = function () {
                Search.get({id: $state.params.id},
                    function success(data) {
                        $scope.search = data.data;
                    });
            };

            init();
        }]);
