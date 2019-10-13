/**
 * Commercial Goals Edit index controller
 */
angular
    .module('app.controllers')
    .controller('CommercialGoalsEditCtrl', ['$scope', '$state', 'Goals', 'toastr', 'appConfig',
        function ($scope, $state, Goals, toastr, appConfig) {

            var goalId = $state.params.id;
            $scope.goal = {};

            $scope.statesAndRegions = appConfig.statesAndRegionKeys;

            $scope.regions = appConfig.regions;


            var init = function () {
                Goals.get({ id: goalId }, function (data) {
                    $scope.goal = data.data;
                    $scope.changeStates(data.data.region);
                    $scope.goal.date = moment($scope.goal.deadline, 'YYYY-MM-DD').format('DD/MM/YYYY');
                });
            };


            $scope.changeStates = function (region) {
                var states = $scope.statesAndRegions.filter(function (obj) {
                    return obj.region === region;
                });

                states = states.map(function (obj) {
                    return obj.state;
                });

                $scope.states = states;
            };

            $scope.save = function(goal) {
                goal.deadline = moment(goal.date, 'DD/MM/YYYY').format('YYYY-MM-DD')

                Goals.update({id: goalId}, goal, function(res) {
                    toastr.success('Meta editada com sucesso!');
                    $state.go('app.commercial-goals');
                })
            }


            init();
        }]);

