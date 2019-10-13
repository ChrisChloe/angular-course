/**
 * Markup Trash controller
 */
angular
    .module('app.controllers')
    .controller('TravelMarkupTrashCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'TravelMarkup', 'Company', 'toastr',
        function ($scope, $rootScope, $state, appConfig, TravelMarkup, Company, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = TravelMarkup;
            $scope.travel_markups   = [];

            $scope.travelMarkup      = null;
            $scope.company          = null;
            $scope.$parent.company  = null;

            var init = function () {

                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('trashed', true);

                Company.get({id: companyId},
                    function success(data) {
                        $scope.$parent.company = data.data;
                        $scope.company = data.data;
                    });

                $scope.$on("itemTrashed", function (event, travelMarkup) {
                    $scope.travel_markups.unshift(travelMarkup);
                });
            };

            $scope.restore = function (travelMarkup) {

                TravelMarkup.restore({id: travelMarkup.id}, travelMarkup,
                    function success(data) {
                        if (!data.error){
                            $scope.travel_markups.splice($scope.travel_markups.indexOf(travelMarkup), 1);
                            toastr.success("Restaurado!");
                        }
                        $rootScope.$broadcast('itemRestored', travelMarkup);
                    });
            };

            init();
        }]);

