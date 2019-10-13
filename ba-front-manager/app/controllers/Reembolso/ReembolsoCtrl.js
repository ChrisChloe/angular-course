/**
 * Emission index controller
 */
angular
    .module('app.controllers')
    .controller('ReembolsoCtrl', ['$scope', '$state', '$uibModal', 'appConfig', 'Refund',
        function ($scope, $state, $uibModal, appConfig, Refund) {

            $scope.resource = Refund;

            $scope.refunds = [];

            $scope.filterCriteria = appConfig.filterCriteria();

            var init = function () {
                $scope.filterCriteria.addParam('status', 0);//removes ARQUIVADO status from list
               
            };

            $scope.openDetails = function (refund) {
                refund.open = !refund.open;
            };
            
            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            /**
             * Open emissions status form
             * @param emission
             */
            $scope.changeStatus = function (refund) {

                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/reembolso/status.html',
                    controller:  'ReembolsoStatusCtrl',
                    size:        'md',
                    resolve: {
                        refund:  refund
                    }
                });

                modalInstance.result.then(function (e) {
                    refund.status_title = e.status_title;
                });
            };

            init();
        }]);

