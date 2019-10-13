/**
 * Agency Trash index controller
 */
angular
    .module('app.controllers')
    .controller('AgencyTrashCtrl', ['$scope', '$rootScope', 'appConfig', 'Agency', 'Group', 'toastr',
        function ($scope, $rootScope, appConfig, Agency, Group, toastr) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Agency;

            $scope.agencies = [];
            $scope.groups = [];

            var init = function () {
                $scope.filterCriteria.addParam('trashed', true);

                $scope.$on("itemTrashed", function (event, agency) {
                    $scope.agencies.unshift(agency);
                });
            };

            $scope.filter = function(search){
                if(search.search && (/^\d{3}.\d{3}.\d{3}-\d{2}$/.test(search.search) || /^\d{2}.\d{3}.\d{3}\/\d{4}\-\d{2}$/.test(search.search))){
                    search = {search: search.search.replace(/\D/g, '')};
                }
                $scope.$broadcast('onSearch', search);
            };

            $scope.restore = function (agency) {

                Agency.restore({ id: agency.id }, agency,
                    function success(data) {
                        if (!data.error) {
                            $scope.agencies.splice($scope.agencies.indexOf(agency), 1);
                            toastr.success("Restaurado!");
                            $scope.$emit('itemRestored', agency);
                        }
                    });
            };

            $scope.thisScope = $scope;
            $scope.agencyTrashTableActions = [
                { isSubmenu: false, isDynamic: false, title: 'Detalhes', icon: 'fa-search', btnColor: 'btn-success', functionCall: 'app.agency-show', fontColor: '#fff' },
                { isSubmenu: true, isDynamic: false, title: 'Restaurar', icon: 'fa-recycle', btnColor: 'btn-success', fontColor: '#fff', modalTitle: 'A agência será restaurada, tem certeza?', confirmTitle: 'Ativar/Desativar', confirmColor: 'btn-success', confirmFunction: 'restore' }
            ];

            init();
        }]);

