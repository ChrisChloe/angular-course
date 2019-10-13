/**
 * OpUser controller
 */
angular
    .module('managerApp')
    .controller('OpUserCtrl', ['$scope', '$state', '$cookies', 'Op', 'User', 'appConfig', 'toastr',
        function ($scope, $state, $cookies, Op, User, appConfig, toastr) {

                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource = Op;

                $scope.ops = [];

                $scope.activateDirectToUser = false;
                $scope.refreshing = false;

                var init = function () {
                    $scope.filterCriteria.addParam('statusNot', 0);
                    $scope.filterCriteria.addParam('statusNot', 6);

                    var user = $cookies.getObject('auth_user');
                    user = user.data ? user.data : user;//@todo: procurar bug que causador do user com e sem chave data

                    if (user) {
                        $scope.filterCriteria.addParam('emitter', user.id);

                        User.query({limit: 99999, 'roles[]': 'emissor'}, {},
                            function success(data) {
                                $scope.users = data.data;
                            });
                    }

                };

                $scope.filter = function (search) {
                    $scope.$broadcast('onSearch', search);
                };

                /**
                 * Lock refresh button and call refresh event
                 */
                $scope.refresh = function () {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');
                };

                /**
                 * Unlock refresh button
                 */
                $scope.changeCallback = function () {
                    $scope.refreshing = false;
                };

                /**
                 * Define responsible user/emissor
                 * @param directTo
                 */
                $scope.directToUser = function (directTo) {
                    Op.directTo({}, directTo,
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Ops direcionadas!");
                                $scope.$broadcast('onRefresh');
                            }
                        });
                };

                /**
                 * Archive single op
                 * @param op
                 */
                $scope.archive = function (op) {
                    Op.update({id: op.id}, {status: 0},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Arquivada!");
                                $scope.ops.splice($scope.ops.indexOf(op), 1);
                            }
                        });
                };

                /**
                 * Select all ops
                 * @param selectAll
                 */
                $scope.selectAllOps = function (selectAll) {
                    if ($scope.ops) {
                        $scope.ops.forEach(function (op) {
                            op.selected = selectAll;
                        });
                    }
                };

                // watch fruits for changes
                $scope.$watch('ops|filter:{selected:true}', function (ops) {
                    $scope.directTo.ops = ops.map(function (op) {
                        return op.id;
                    });
                }, true);

                init();
        }]);

