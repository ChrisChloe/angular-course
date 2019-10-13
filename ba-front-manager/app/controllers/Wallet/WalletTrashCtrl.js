/**
 * wallet index controller
 */
angular
    .module('app.controllers')
    .controller('WalletTrashCtrl', ['$scope', '$state', 'appConfig', 'Wallet', 'toastr',
        function ($scope, $state, appConfig, Wallet, toastr) {

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Wallet;

            $scope.wallets = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, wallet) {
                    $scope.wallets.push(wallet);
                });
            };

            $scope.delete = function (wallet) {
                Wallet.delete({id: wallet.id}, wallet,
                    function success(data) {
                        if (!data.error){
                            $scope.wallets.splice($scope.wallets.indexOf(wallet), 1);
                            toastr.success("Excluído!");
                        }
                    });
            };

            $scope.restore = function (wallet) {

                Wallet.restore({id: wallet.id}, wallet,
                    function success(data) {
                        $scope.$emit('itemRestored', wallet);
                        if (!data.error){
                            $scope.wallets.splice($scope.wallets.indexOf(wallet), 1);
                            toastr.success("Restaurado!");
                        }
                    });
            };

            init();
        }]);

