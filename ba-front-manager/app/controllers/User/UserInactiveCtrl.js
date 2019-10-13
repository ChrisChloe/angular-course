/**
 * User Inactive controller
 */
angular
    .module('app.controllers')
    .controller('UserInactiveCtrl', ['$scope', 'appConfig', 'User', 'toastr',
        function ($scope, appConfig, User, toastr) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = User;
            $scope.region = appConfig.region;
            $scope.birthday = appConfig.birthday;

            $scope.users = [];
            $scope.search = {'birthday': ''};

            var init = function () {
                $scope.filterCriteria.addParam('status', 2);
            };

            var birthdayCustomFormat = function(birthday){
                var array = birthday.split('/');
                return array[1]+"-"+array[0];
            };

            /**
             * Lock refresh button and call refresh event
             */
            $scope.refresh = function () {
                $scope.refreshing = true;
                $scope.$broadcast('onRefresh');
            };

            $scope.filter = function(search){
                search.status = 2;
                if(search && search.birthday){
                    switch (search.birthday){
                        case 'month':
                            search.min_birthday = moment().startOf('month').format('MM-DD');
                            search.max_birthday = moment().endOf('month').format('MM-DD');
                            break;
                        case 'week':
                            search.min_birthday = moment().startOf('week').format('MM-DD');
                            search.max_birthday = moment().endOf('week').format('MM-DD');
                            break;
                        case 'day':
                            search.min_birthday = moment().startOf('day').format('MM-DD');
                            search.max_birthday = moment().endOf('day').format('MM-DD');
                            break;
                        case 'custom':
                            search.min_birthday = birthdayCustomFormat(search.from);
                            search.max_birthday = birthdayCustomFormat(search.to);
                            break;
                        default:
                            delete search.min_birthday;
                            delete search.max_birthday;
                    }
                }else if(search){
                    delete search.min_birthday;
                    delete search.max_birthday;
                }

                $scope.$broadcast('onSearch', search);
            };

            $scope.activate = function (user) {

                User.update({id: user.id}, {status: 1},
                    function success(data) {
                        if (!data.error) {
                            user.status = status;
                            toastr.success("Atualizado!");
                            $scope.refresh();
                        }
                    });
            };

            $scope.trash = function (user) {

                User.trash({id: user.id}, user,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', user);
                            $scope.users.splice($scope.users.indexOf(user), 1);
                            toastr.success("Enviado para Lixeira!");
                        }
                    });
            };

            $scope.changeSelect = function(){
                if($scope.search && !$scope.search.birthday) {
                     $scope.search.push({birthday: 'custom'});
                }else if($scope.search){
                     $scope.search.birthday = 'custom';
                }else {
                    $scope.search = {};
                    $scope.search.birthday = 'custom';
                }
            };

            $scope.changeSelectOption = function(){
                if($scope.search && $scope.search.birthday != 'custom') {
                    $scope.search.from = '';
                    $scope.search.to = '';
                }
            };

            $scope.thisScope = $scope;
            $scope.userInactiveTableActions = [
                { isSubmenu: false, isDynamic: false, title: 'Detalhes', icon: 'fa-search', btnColor: 'btn-success', functionCall: 'app.user-show', fontColor: '#fff' },
                { isSubmenu: false, isDynamic: false, title: 'Editar', icon: 'fa-edit', btnColor: 'btn-info', functionCall: 'app.user-edit', fontColor: '#fff' },
                { isSubmenu: true, isDynamic: false, title: 'Excluir', icon: 'fa-trash', btnColor: 'btn-danger', fontColor: '#fff', modalTitle: 'Deseja excluir?', confirmTitle: 'Excluir', confirmColor: 'btn-danger', confirmFunction: 'trash' },
                { isSubmenu: true, isDynamic: false, title: 'Ativar Usuário', icon: 'fa-check-circle', btnColor: 'btn-success', fontColor: '#fff', modalTitle: 'O usuário será ativado, tem certeza?', confirmTitle: 'Ativar/Desativar', confirmColor: 'btn-success', confirmFunction: 'activate' }
            ];

            init();


        }]);

