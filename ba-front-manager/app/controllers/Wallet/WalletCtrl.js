/**
 * wallet index controller
 */
angular
    .module('app.controllers')
    .controller('WalletCtrl', ['$scope', '$state', 'appConfig', 'Wallet', 'toastr',
        function ($scope, $state, appConfig, Wallet, toastr) {

            $scope.resource = Wallet;

            $scope.wallets = [];

            var init = function () {
                $scope.$on("itemRestored", function (event, wallet) {
                    $scope.wallets.push(wallet);
                });
            };

            $scope.inactivate = function (wallet) {
                var status = + !wallet.status;

                Wallet.update({id: wallet.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            wallet.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.wallet');
                        }
                    });
            };

            $scope.trash = function (wallet) {

                Wallet.trash({id: wallet.id}, wallet,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', wallet);
                            $scope.wallets.splice($scope.wallets.indexOf(wallet), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            init();

        }]);

