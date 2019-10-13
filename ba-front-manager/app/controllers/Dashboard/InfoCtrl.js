/**
 * Info Ctrl index controller
 */
angular
    .module('app.controllers')
    .controller('InfoCtrl', ['$scope', 'appConfig', 'Api', '$uibModal', 'toastr',
        function ($scope, appConfig, Api, $uibModal, toastr) {

            $scope.openPurge = function(){
                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/dashboard/show.html',
                    controller:  'InfoCtrl',
                    size:        'lg'
                });

                modalInstance.result.then(function () {
                    load();
                });

            };


            $scope.purge = function (system) {
                Api.purge({system:system},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Limpeza realizada com sucesso!");
                        }
                    });
            };

            $scope.employees = appConfig.employees;

            var init = function () {
                //
            }

            init();
        }]);

