/**
 * Emission index controller
 */
angular
    .module('app.controllers')
    .controller('EmissionByInvoiceCtrl', ['$scope', '$state', '$location', '$uibModal', 'appConfig', 'Emission',  'userUtils',
        function ($scope, $state, $location, $uibModal, appConfig, Emission, userUtils) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Emission;

            $scope.emissions = [];

            $scope.codes = appConfig.checkInCodes;

            $scope.search = {
                search: $location.search().search,
                from: null,
                to:   null
            };

            $scope.can_edit = !!userUtils.hasRole('Financeiro');

            /**
             * init
             * @param void
             */
            var init = function () {
                if ($state.params.id) {
                    $scope.filterCriteria.addParam('invoice_id', $state.params.id);
                }
            };

            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            $scope.delete = function (api) {
                //@Todo:delete
            };

            $scope.trash = function (api) {
                //@Todo:trash
            };
            init();
        }]);

