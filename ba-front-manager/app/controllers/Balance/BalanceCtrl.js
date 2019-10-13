/**
 * Balance index controller
 */
angular
    .module('app.controllers')
    .controller('BalanceCtrl', ['$scope', '$state', 'appConfig', 'Balance', 'toastr', '$uibModal',
        function ($scope, $state, appConfig, Balance, toastr, $uibModal) {

            var STATUS_CONFIRMED = 1; //Preco de compra de milha confirmada
            var STATUS_WAITING   = 2; //Aguardando confirmacao de preco de compra de milhas
            var STATUS_MODIFIED  = 3; //Preço de compra confirmada
            var STATUS_CANCELED  = 4; //Cancelado reembolsado

            $scope.resource = Balance;
            $scope.balances = [];

            var init = function () {
                //
            };

            $scope.confirm = function (balance) {
                Balance.confirm({id: balance.id}, {},
                    function success(data) {
                        if (!data.error) {
                            balance.status = STATUS_MODIFIED;
                            balance.status_title = 'Confirmado';
                            balance.is_confirmed = true;
                            balance.is_canceled = false;
                            toastr.success("Confirmado!");
                        }
                    });
            };

            $scope.cancel = function (balance) {
                Balance.cancel({id: balance.id}, {},
                    function success(data) {
                        if (!data.error) {
                            balance.status = STATUS_CANCELED;
                            balance.status_title = 'Cancelado';
                            balance.is_canceled = true;
                            balance.is_confirmed = false;
                            toastr.success("Cancelado!");
                        }
                    });
            };

            $scope.showStock = function (balance) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/stock/detail.html',
                    controller: 'StockDetailCtrl',
                    size: 'md',
                    resolve: {
                        stock_id: balance.emission.stock_id
                    }
                });

            };

            $scope.showProvider = function (balance) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/provider/detail.html',
                    controller: 'ProviderDetailCtrl',
                    size: 'md',
                    resolve: {
                        provider_id: balance.emission.provider_id
                    }
                });

            };

            init();
        }]);

