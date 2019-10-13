/**
 * OpIndex controller
 */
angular
    .module('managerApp')
    .controller('OpWaitCtrl', ['$scope', '$cookies', 'Op', 'User', 'appConfig', 'toastr', 'userUtils','$interval', '$location', '$uibModal',
        function ($scope, $cookies, Op, User, appConfig, toastr, userUtils, $interval, $location, $uibModal) {

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

                /**
                 * Initializer
                 */
                var init = function () {
                    $scope.filterCriteria.addParam('statusNot', [0, 6]);
                    $scope.filterCriteria.addParam('received', 0);
                };

                $scope.filter = function (search) {
                    search.received = 0;
                    search.statusNot = 0;
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

                $scope.$on('onArchiveOp', function (event, op) {
                    Op.update({id: op.id}, {status: 0, archived_reason: op.archived_reason},
                        function success(data) {
                            if (!data.error) {
                                toastr.success("Arquivada!");
                                $scope.ops.splice($scope.ops.indexOf(op), 1);
                            };
                        });
                });


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

                /**
                 *
                 * @param op
                 */
                $scope.changeFormPayment = function (op) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/op/change-form-payment.html',
                        controller: 'OpChangeFormPaymentCtrl',
                        size: 'mini',
                        position: 'md',
                        windowClass: 'm-t-xxl p-v-xxl',
                        resolve: {
                            id: op.id,
                            waitScope: $scope
                        }
                    });

                    modalInstance.result.then(function () {
                        load();
                    });
                };

                /*
                *
                * Create attachment for approved payments
                *  
                */
                $scope.createAttachment = function (op) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/op/modals/create-attachments.html',
                        controller: 'OpCreateAttachmentsCtrl',
                        size: 'md',
                        position: 'md',
                        windowClass: 'm-t-xxl p-v-xxl',
                        resolve: {
                            id: op.id,
                            parentScope: $scope
                        }
                    });

                    modalInstance.result.then(function () {
                        load();
                    });
                };

                /**
                 * Libera op para o financeiro ou para emissão caso a mesma esteja paga/ativa
                 * @param op
                 */
                $scope.releaseOp = function (op) {
                    Op.releaseAdmission({id: op.id},
                        function success(data) {
                            if (data.error) return data;
                            toastr.success("Recebimento do email confirmado com sucesso!");
                            $scope.refresh();
                        }, function error(err) {
                            toastr.error(err.message, 'Erro de confirmação!');
                        });
                };

                init();
            }else{
                $location.path( "/#" );
            }
        }]);

