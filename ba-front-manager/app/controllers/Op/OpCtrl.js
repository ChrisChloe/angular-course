/**
 * OpIndex controller
 */
angular
    .module('managerApp')
    .controller('OpCtrl', ['$scope', '$cookies', '$state', 'Op', 'User', 'appConfig', 'toastr', 'userUtils','$interval', '$location',
        function ($scope, $cookies, $state, Op, User, appConfig, toastr, userUtils, $interval, $location) {

            if(userUtils.isManager() || userUtils.isEmitter() || userUtils.isFinancial()) {
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
                $scope.isFinancial = userUtils.isFinancial;

                /**
                 * Initializer
                 */
                var init = function () {

                    $scope.filterCriteria.addParam('status', 7);
                    $scope.filterCriteria.addParam('form_payment', 0);

                };

                $scope.filter = function (search) {
                    $scope.filterCriteria.addParam('status', 7);
                    search.form_payment = 0;
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
                // $scope.$on('onArchiveOp', function (event, op) {
                //     Op.update({id: op.id}, {status: 0, archived_reason: op.archived_reason},
                //         function success(data) {
                //             if (!data.error) {
                //                 toastr.success("Arquivada!");
                //                 $scope.ops.splice($scope.ops.indexOf(op), 1);
                //             };
                //         });
                // });

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

                $scope.canShowToUser = function(menu){
                    var canShow = false;

                    if($scope.user.roles){
                        $scope.user.roles.forEach(function(role){
                            if(role.name.toLowerCase() == 'root' || (role.name.toLowerCase() == 'financeiro' && menu == 'financial')){
                                canShow = true;
                                return false;
                            }
                        });
                    }
                    return canShow;
                };

                init();
            }else{
                $location.path( "/#" );
            }
        }]);

