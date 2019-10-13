/**
 * OpArchived controller
 */
angular
    .module('managerApp')
    .controller('OpArchivedCtrl', ['$scope', 'appConfig', 'Op', 'toastr', 'userUtils', '$location',
        function ($scope, appConfig, Op, toastr, userUtils, $location) {
            
            var init = function () {
                //Custom criteria
                $scope.filterCriteria = appConfig.filterCriteria();
                $scope.filterCriteria.addParam('status', '0');
                $scope.resource = Op;

                $scope.ops = [];
            };

            $scope.archiving_reasons = appConfig.op_archive_reasons;


            $scope.filter = function (search) {
                search.status = 0;
                $scope.filterCriteria.addParam('status', '0');
                $scope.$broadcast('onSearch', search);
            };

            $scope.unblock = function(op){

                Op.update({id: op.id}, {status:1},
                    function success(data) {
                        if (!data.error) {
                            $scope.ops.splice($scope.ops.indexOf(op), 1);
                            toastr.success('Desarquivada!');
                        }
                    });
            };

            if(userUtils.isManager() || userUtils.isEmitter()){
                init();
            }else{
                $location.path( "/#" );
            }
        }]);

