/**
 * OpIndex controller
 */
angular
    .module('managerApp')
    .controller('OpFinancialCtrl', ['$scope', '$cookies', 'Op', 'User', 'appConfig', 'toastr', 'userUtils','$interval', '$location', '$window', '$uibModal',
        function ($scope, $cookies, Op, User, appConfig, toastr, userUtils, $interval, $location, $window, $uibModal) {

            if(userUtils.isManager() || userUtils.isFinancial()) {
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

                    $scope.filterCriteria.addParam('form_paymentNot', 'not');
                    $scope.filterCriteria.addParam('received', 1);
                    $scope.filterCriteria.addParam('status', 7);
                    $scope.filterCriteria.addParam('status', 2);
                };

                $scope.filter = function (search) {
                    search.form_paymentNot = 'not';
                    search.status          = [7,2];
                    search.received        = 1;
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
                 *
                 * @param op
                 */
                $scope.show = function (op) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/op/modals/show-attachments.html',
                        controller: 'OpShowAttachmentsCtrl',
                        size: 'md',
                        position: 'md',
                        windowClass: 'm-t-xxl p-v-xxl',
                        resolve: {
                            id: op.id,
                            financialScope: $scope
                        }
                    });

                    modalInstance.result.then(function () {
                        load();
                    });
                };

                $scope.confirmAgencyCredit = function (op) {
                    Op.updateStatusToActive({id: op.id,form_payment:op.form_payment}, {},
                        function success(response) {
                            if (response.error) {
                                toastr.error(response.message);
                                return;
                            }
                            toastr.success('Op Ativada!');
                            $scope.refresh();
                        });

                };

                init();
            }else{
                $location.path( "/#" );
            }
        }]);

