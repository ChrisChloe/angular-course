/**
 * Email message show create controller
 */
angular
    .module('managerApp')
    .controller('OpDetailsCtrl', ['$scope', '$state', 'Op', 'toastr', 'appConfig',
        function ($scope, $state, Op, toastr, appConfig) {


            $scope.auditLogs = [];

            $scope.opArchivedReason = null;


            $scope.init = function (id) {

                Op.auditLog({ op_id: id },
                    function success(data) {
                        $scope.auditLogs = data.data;
                    });

            }

        }]);

