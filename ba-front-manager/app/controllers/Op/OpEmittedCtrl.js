/**
 * OpEmitted controller
 */
angular
    .module('managerApp')
    .controller('OpEmittedCtrl', ['$scope', 'appConfig', 'Op', 'User', 'userUtils',
        function ($scope, appConfig, Op, User, userUtils) {
                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource = Op;

                $scope.ops = [];

                $scope.$parent.tabEmittedTitle = 'Bilhetes';

                $scope.userStatistics = [];

                var user = userUtils.getUser();

                var init = function () {

                    // User.get({id: user.id},
                    //     function success(response) {
                    //         $scope.userStatistics = response.data.statistics;
                    //     });

                    if (!userUtils.isManager()) {
                        $scope.$parent.tabEmittedTitle = 'Meus Bilhetes';
                        $scope.filterCriteria.addParam('emitter', userUtils.getUser().id);
                    }

                    $scope.filterCriteria.addParam('status', 6, true);
                };

                $scope.archive = function (op) {
                    Op.update({id: op.id}, {status: 0},
                        function success(data) {
                            if (!data.error) {
                                toastr.success('Arquivada!');
                                $scope.ops.splice($scope.ops.indexOf(op), 1);
                            }
                        });
                };

                $scope.filter = function (search) {
                    search.status = 6;
                    $scope.$broadcast('onSearch', search);
                };

                init();
        }]);

