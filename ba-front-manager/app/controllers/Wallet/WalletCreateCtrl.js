/**
 * wallet create controller
 */
angular
    .module('app.controllers')
    .controller('WalletCreateCtrl', ['$scope', '$state', 'appConfig', 'Wallet', 'User', 'toastr',
        function ($scope, $state, appConfig, Wallet, User, toastr) {

            $scope.title = "Adicionar Carteira";
            $scope.wallet = null;

            $scope.users        = [];
            $scope.selectedUser = null;

            var init = function () {
                $scope.wallet = new Wallet();
            };

            $scope.save = function (wallet) {
                wallet.$save(
                    function success(data) {
                        if (!data.error) {
                            $state.go('app.wallet', data.data);
                            toastr.success("Salvo!");
                        }
                    }
                );
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
