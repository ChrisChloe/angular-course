/**
 * Search index controller
 */
angular
    .module('app.controllers')
    .controller('SearchCtrl', ['$scope', '$state', 'appConfig', 'Search', 'Group',
        function ($scope, $state, appConfig, Search, Group) {

            $scope.resource = Search;

            $scope.searches = [];

            $scope.region = appConfig.search_region;
            $scope.status = appConfig.search_status;

            var init = function () {
                Group.query({}, function (data) {
                    $scope.groups = data.data;
                    $scope.groups.unshift({id:'nulo', name:'Sem Grupo'});
                });
            };

            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            init();
        }]);

