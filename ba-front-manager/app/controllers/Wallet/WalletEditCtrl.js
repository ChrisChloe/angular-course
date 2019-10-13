/**
 * wallet edit controller
 */
angular
    .module('app.controllers')
    .controller('WalletEditCtrl', ['$scope', '$state', '$filter', 'appConfig', 'Wallet', 'User', 'toastr',
        function ($scope, $state, $filter, appConfig, Wallet, User, toastr) {

            $scope.title         = "Editar Carteira";
            $scope.wallet        = null;

            $scope.users        = [];
            $scope.selectedUser = null;

            var init = function () {

                Wallet.get({id: $state.params.id}, function (data) {
                    console.log(data);
                    $scope.wallet = data;
                });
            };

            $scope.save = function (wallet) {
                console.log(wallet);
                Wallet.update({id: wallet.id}, wallet,
                    function (data) {
                        console.log(data);

                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.wallet');
                        }
                    });
            };

            $scope.onSelectAnalystUser = function(item) {
                $scope.wallet.analyst_user_id = null;
                $scope.selectedUser = item;
                $scope.wallet.analyst_user_id = item.id;
                $scope.canSelectCard = true;
            };

            $scope.onSelectManagerUser = function(item) {
                $scope.wallet.manager_user_id = null;
                $scope.selectedUser = item;
                $scope.wallet.manager_user_id = item.id;
                $scope.canSelectCard = true;
            };

            $scope.listUsers = function (search, limit){

                var query = {
                    search:     search,
                    orderBy:    'name',
                    sortedBy:   'asc',
                    type:       '2',
                    limit:      limit ? limit : 100
                };

                User.query(query,
                    function success(data) {

                        if(data.data && data.data.length){
                            console.log(data.data);
                            $scope.users = data.data;
                        }
                    });
            };

            init();
        }]);
