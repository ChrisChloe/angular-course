/**
 * Download Attachment Button
 */
angular
    .module('app.directives')
    .directive('baOpArchiveReason', ['appConfig',
        function (appConfig) {

            return {
                replace: true,
                templateUrl:    'views/op/archive-op-template.html',
                scope: {
                    op: '=op'

                },
                controller: ['$scope', 'appConfig', function ($scope, appConfig) {

                    $scope.reasons = appConfig.op_archive_reasons;

                    $scope.selectedReason = function (reason) {
                       
                        $scope.op.archived_reason = reason;
                    
                        $scope.$emit('onArchiveOp', $scope.op);
                    };


                }],

                link: function ($scope, $element, attr) {
                    

                }
            };
        }]);
