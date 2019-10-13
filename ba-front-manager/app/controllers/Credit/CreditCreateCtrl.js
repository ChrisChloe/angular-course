/**
 * Credit create controller
 */
angular
    .module('app.controllers')
    .controller('CreditCreateCtrl', ['$scope', '$uibModalInstance', 'appConfig', 'Credit', 'agency', 'toastr','FinancialPayable','$uibModal',
        function ($scope, $uibModalInstance, appConfig, Credit, agency, toastr,FinancialPayable,$uibModal) {
            
            $scope.todayFilter = moment().format('DD/MM/YYYY');
            $scope.credit  = new Credit();
            $scope.agency  = agency;
            var init = function () {

                $scope.credit = new Credit();
                $scope.credit.agency_id = agency.id;
                FinancialPayable.getBanks({}, {resource: 'api.payments.banks'},
                    function success(data) {
                        $scope.bank_accounts = data.data;
                    });
            };

            $scope.save = function (credit) {
               credit.$save(
                    function success(data) {
                        if (!data.error) {
                            $uibModalInstance.close(data.data);
                            toastr.success("Salvo!");
                            $scope.addAttachment($scope.agency);
                        }
                    }
                );
            };

            $scope.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.addAttachment = function (agency) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/agency/modals/attachment.html',
                    controller: 'AttachmentCreateCtrl',
                    size: 'md',
                    resolve: {
                        agency: agency
                    }
                });

                modalInstance.result.then(function (attachment) {
                    $scope.refreshing = true;
                    $scope.$broadcast('onRefresh');
                });
            };

            init();
        }]);
