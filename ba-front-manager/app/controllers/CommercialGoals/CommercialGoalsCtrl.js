/**
 * Commercial Goals index controller
 */
angular
    .module('app.controllers')
    .controller('CommercialGoalsCtrl', ['$scope', 'Goals', 'toastr', '$window',
        function ($scope, Goals, toastr, $window) {
            
            $scope.resource = Goals;
            $scope.goals = [];

            var init = function () {
            }

            $scope.delete = function(id) {
                Goals.delete({id: id}, function success(res) {
                    $window.location.reload();
                    toastr.success('Meta excluída com sucesso!');
                });
            }




            init();
        }]);

