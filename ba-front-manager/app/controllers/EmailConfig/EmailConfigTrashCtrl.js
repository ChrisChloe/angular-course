/**
 * MailConfig index controller
 */
angular
    .module('app.controllers')
    .controller('EmailConfigTrashCtrl', ['$scope', '$state', 'appConfig', 'EmailConfig', 'toastr',
        function ($scope, $state, appConfig, EmailConfig, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = EmailConfig;

            $scope.groups = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, group) {
                    $scope.groups.push(group);
                });
            };

            $scope.delete = function (group) {
                EmailConfig.delete({id: group.id}, group,
                    function success(data) {
                        if (!data.error){
                            $scope.groups.splice($scope.groups.indexOf(group), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.restore = function (group) {

                EmailConfig.restore({id: group.id}, group,
                    function success(data) {
                        $scope.$emit('itemRestored', group);
                        if (!data.error){
                            $scope.groups.splice($scope.groups.indexOf(group), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

