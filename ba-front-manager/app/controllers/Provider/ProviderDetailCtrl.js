/**
 * Provider Detail controller
 */
angular
    .module('managerApp')
    .controller('ProviderDetailCtrl', ['$scope', '$rootScope', 'appConfig', 'provider_id', 'Provider', 'toastr', '$uibModalInstance',
        function ($scope, $rootScope, appConfig, provider_id, Provider, toastr, $uibModalInstance) {

            $scope.provider = null;

            var init = function () {

                Provider.get({id: provider_id},
                    function success(response) {
                        $scope.provider = response.data;
                    });
            };

            $scope.close = function () {
                $uibModalInstance.close();
            };

            init();
        }]);

