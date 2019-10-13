/**
 * Markup Trash controller
 */
angular
    .module('app.controllers')
    .controller('MarkupTrashCtrl', ['$scope', '$state', 'appConfig', 'Markup', 'Company', 'toastr',
        function ($scope, $state, appConfig, Markup, Company, toastr) {

            var companyId = $state.params.id;

            //Custom criteria
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = Markup;

            $scope.markupTypes = [];
            $scope.markups     = [];
            $scope.markup      = null;
            $scope.company     = null;

            var init = function () {
                $scope.filterCriteria.addParam('company', companyId);
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, markup) {
                    $scope.markups.unshift(markup);
                });
            };

            $scope.restore = function (markup) {

                Markup.restore({id: markup.id}, markup,
                    function success(data) {
                        if (!data.error){
                            $scope.markups.splice($scope.markups.indexOf(markup), 1);
                            toastr.success("Restaurado!");
                            $scope.$emit('itemRestored', markup);
                        }
                    });
            };

            $scope.getAirports = function(markup){

                if(markup.airport){
                    return markup.airport.initials;
                }else if(markup.origin || markup.destination){
                    return markup.origin.initials + ' ' + markup.destination.initials;
                }

                return '--';
            };

            init();
        }]);

