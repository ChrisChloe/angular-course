/**
 * Search index controller
 */
angular
    .module('app.controllers')
    .controller('SearchGroupCtrl', ['$scope', '$state', 'appConfig', 'SearchGroup', 'Group',
        function ($scope, $state, appConfig, SearchGroup, Group) {

            $scope.resource = SearchGroup;

            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.searches = [];

            $scope.region = appConfig.search_region;
            $scope.status = appConfig.search_status;

            $scope.detailTitle = "ID"

            var init = function () {
                if($state.params.search){
                    $scope.filterCriteria.addParam('search', $state.params.search);
                    $scope.search.search = $state.params.search;
                }

                $scope.search.min_date = moment().format('DD/MM/YYYY');
                $scope.search.max_date = moment().format('DD/MM/YYYY');
                $scope.filterCriteria.addParam('end_date', moment().format('YYYY-MM-DD'));
                $scope.filterCriteria.addParam('start_date', moment().format('YYYY-MM-DD'));

                Group.query({}, {},
                function (data) {
                    $scope.groups = data.data;
                    $scope.groups.unshift({id:'nulo', name:'Sem Grupo'});
                });
            };

            $scope.clearDate = function(id) {
                if(id == 1){
                    $scope.search.min_date = "";
                }else{
                    $scope.search.max_date = "";
                }
            }

            $scope.search = {
                status_id: '',                
                min_date: null,
                max_date: null
            }

            $scope.filter = function(search){
                if (search.min_date && search.max_date) {
                    search.start_date = moment(moment(search.min_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                    search.end_date   = moment(moment(search.max_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                }else{
                    search.start_date = null;
                    search.end_date   = null;
                }
                $scope.$broadcast('onSearch', search);
            };

            $scope.openDetails = function(search){
                search.open = !search.open;

                if(search.open){
                    SearchGroup.get({id: search.id},
                        function success(data) {
                            search.search_detail = data.data;
                        });
                }
            };

            init();

        }]);

