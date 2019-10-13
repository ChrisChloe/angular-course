/**
 * Commercial Goals Create index controller
 */
angular
    .module('app.controllers')
    .controller('CommercialGoalsCreateCtrl', ['$scope', '$state', 'appConfig', 'Goals', 'toastr', '$window',
        function ($scope, $state, appConfig, Goals, toastr, $window) {
            
            $scope.statesAndRegions = appConfig.statesAndRegionKeys;

            $scope.states = [];

            $scope.regions = appConfig.regions;

            var init = function () {

            }

            $scope.changeStates = function(region) {
                var states = $scope.statesAndRegions.filter(function(obj) {
                    return obj.region === region;
                });
                
                states = states.map(function(obj) {
                    return obj.state;
                });

                $scope.states = states;
            }

            $scope.save = function(goal) {
                goal.deadline = moment(goal.date, 'DD/MM/YYYY').format('YYYY-MM-DD')

                Goals.save(goal, function success(res) {
                    toastr.success('Meta criada com sucesso!');
                    $state.go('app.commercial-goals');

                });
            }


            init();
        }]);

