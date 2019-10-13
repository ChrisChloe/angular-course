/**
 * Employee index controller
 */
angular
    .module('app.controllers')
    .controller('EmployeeCtrl', ['$scope', '$state', 'appConfig', 'User', 'Agency', 'toastr',
        function ($scope, $state, appConfig, User, Agency, toastr) {
            var agencyId    = $state.params.id;
            // var loadedCount = 0;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = User;

            $scope.users = [];
            $scope.agency = null;

            var init = function () {
                $scope.filterCriteria.addParam("agency", agencyId);

                Agency.get({id: agencyId},
                    function success(data) {
                        $scope.agency = data.data;
                    });
            };

            // $scope.mailerChanged = function (agency) {
            //     loadedCount++;

            //     if (loadedCount >= 3) {
            //         Agency.update({id: agency.id}, {mailer: agency.mailer},
            //             function success(data) {
            //                 if (!data.error) {
            //                     toastr.success("Atualizado!");
            //                 }
            //             });
            //     }
            // };

            var updateUser = function(user, status) {
                User.update({id: user.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            user.status = status;
                            toastr.success("Atualizado!");
                        }
                    });
            };

            $scope.inactivate = function (user) {
                updateUser(user, 2);
            };

            $scope.activate = function (user) {
                updateUser(user, 1);
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

            init();
        }]);

