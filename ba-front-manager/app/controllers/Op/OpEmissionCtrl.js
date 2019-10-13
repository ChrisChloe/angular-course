/**
 * OpIndex controller
 */
angular
    .module('managerApp')
    .controller('OpEmissionCtrl', ['$scope', '$cookies', 'Op', 'User', 'appConfig', 'toastr', 'userUtils', '$interval', '$location',
        function ($scope, $cookies, Op, User, appConfig, toastr, userUtils, $interval, $location) {

            if (userUtils.isManager() || userUtils.isEmitter()) {
                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.resource = Op;

                $scope.ops = [];
                $scope.users = [];

                $scope.activateDirectToUser = false;
                $scope.refreshing = false;
                $scope.directTo = {
                    user_id: null,
                    ops: null
                };

                var user = userUtils.getUser();
                $scope.user = user;

                $scope.isEmitter = userUtils.isEmitter;
                $scope.isManager = userUtils.isManager;
                $scope.isRoot = userUtils.isRoot;


                /**
                 * Initializer
                 */
                var init = function () {

                    $scope.filterCriteria.addParam('status', 1);
                    $scope.filterCriteria.addParam('received', 1);
                };

                $scope.filter = function (search) {
                    search.status   = 1;
                    search.received = 1;
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
                            }else{
                                toastr.warning("Op já foi direcionada!");
                                $scope.refresh();
                            }
                        });
                };


                /**
                 * Define responsible to logged emissor
                 */
                $scope.directToMe = function (op) {

                    var emitterId = userUtils.isEmitter() ? userUtils.isEmitter().id : null;

                    if (emitterId) {
                        Op.directTo({}, {op_id: op.id},
                            function success(data) {
                                if (!data.error) {
                                    toastr.success("Op direcionada!");
                                    $scope.$broadcast('onRefresh');
                                }else{
                                    toastr.warning("Op já foi adimitida por outro emissior!");
                                    $scope.refresh();
                                }
                            });
                    } else {
                        toastr.error("Você não é emissor!");
                    }

                };

                /**
                 * Archive single op
                 * @param op
                 */
                $scope.$on('onArchiveOp', function (event, op) {

                    Op.update({id: op.id}, {status: 0, archived_reason: op.archived_reason},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Arquivada!");
                                $scope.ops.splice($scope.ops.indexOf(op), 1);
                            }
                        });
                });

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
                /**
                 * Libera op para admissão
                 * @param op
                 */
                $scope.releaseAdmission = function (op) {
                    Op.releaseAdmission({id: op.id},
                        function success(data) {
                            if (data.error) return data;
                            toastr.success("Op liberada para admissão!");
                            $scope.refresh();
                        }, function error(err) {
                            toastr.error(err.message, 'Erro de liberação!');
                        });
                };

                // $scope.notify = function () {
                //     Op.notify(
                //         function success(data) {
                //             if (data.qty > 0) {
                //                 var myNotification = new Notify('Atenção ' + user.name, {
                //                     body: 'Foi liberado uma nova Op!'
                //                 });
                //                 myNotification.show();
                //             }
                //         }
                //     );
                // };

                // $interval( function(){ $scope.notify(); }, 102000);

                init();
            } else {
                $location.path("/#");
            }
        }]);

