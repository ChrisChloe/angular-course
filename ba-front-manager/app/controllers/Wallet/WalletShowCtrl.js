/**
 * wallet show controller
 */
angular
    .module('app.controllers')
    .controller('WalletShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'Wallet', 'User', 'toastr',
        function ($scope, $state, appConfig, $filter, Wallet, User, toastr) {

            var walletId  = $state.params.id;
            $scope.wallet = null;
            $scope.title = 'Detalhes Carteira';

            var analystId = null;
            var managerId = null;

            var init = function () {

                Wallet.get({id: walletId},
                    function success(data) {
                        $scope.wallet = data;

                        analystId = data.analyst_user_id;
                        managerId = data.manager_user_id;

                        User.get({id: analystId},
                            function success(data) {
                                $scope.wallet.analyst_name = data.data.name;

                            });

                        User.get({id: managerId},
                            function success(data) {
                                $scope.wallet.manager_name = data.data.name;
                            });
                    });
            };

            init();
        }]);
