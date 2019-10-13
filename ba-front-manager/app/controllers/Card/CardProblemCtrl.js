/**
 * Card create controller
 */
angular
    .module('managerApp')
    .controller('CardProblemCtrl', ['$scope', 'card', 'CardComment', 'toastr', '$uibModalInstance',
        function ($scope, card, CardComment, toastr, $uibModalInstance) {

            $scope.problem = {
                description: ''
            };

            $scope.sending = false;

            var init = function () {
            };

            $scope.save = function (problem) {
                $scope.sending = true;

                problem.type    = 1;
                problem.card_id = card.id;

                CardComment.save({}, problem,
                    function success(response) {
                        if (!response.error) {
                            //Return To Add List
                            $uibModalInstance.close({remove:true});
                            toastr.success("Salvo!");
                            $scope.sending = false;
                        }
                    }
                );
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            init();
        }]);

