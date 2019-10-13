/**
 * Emission index controller
 */
angular
    .module('app.controllers')
    .controller('EmissionCtrl', ['$scope', '$state', '$location', '$uibModal', 'appConfig', 'Emission', 'Company', 'userUtils',
        function ($scope, $state, $location, $uibModal, appConfig, Emission,  Company, userUtils) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Emission;

            $scope.emissions = [];
            $scope.companies = [];

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
                $scope.filterCriteria.addParam('from', $scope.search.from);
                $scope.filterCriteria.addParam('to', $scope.search.to);

                Company.query({}, function(response){
                    if(response.data){
                        $scope.companies = response.data;
                    }
                });
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

            /**
             * Open emissions details
             * @param emission
             */
            $scope.openDetails = function (emission) {
                emission.open = !emission.open;
            };

            /**
             * Open emissions status form
             * @param emission
             */
            $scope.changeStatus = function (emission) {

                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/emission/status.html',
                    controller:  'EmissionStatusCtrl',
                    size:        'md',
                    resolve: {
                        emission:  emission
                    }
                });

                modalInstance.result.then(function (e) {
                    emission.status_title = e.status_title;
                });
            };

            init();
        }]);

