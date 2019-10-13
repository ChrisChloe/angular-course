/**
 * Agency index controller
 */
angular
    .module('app.controllers')
    .controller('AgencyCtrl', ['$scope', '$rootScope', '$location', 'appConfig', 'Agency', 'Group', 'toastr',
        function ($scope, $rootScope, $location, appConfig, Agency, Group, toastr) {


            $scope.resource = Agency;

            $scope.agencies = [];
            $scope.groups = [];
            $scope.filterCriteria = appConfig.filterCriteria();


            $scope.search = {
                search: $location.search().search
            };

            var init = function () {
                $scope.$on("itemRestored", function (event, agency) {
                    $scope.agencies.unshift(agency);
                });
            };

            $scope.normalFilter = function(search) {
                if(search) search.advanced_search = false;
                $scope.$emit('filter', search);
            };

            $scope.$on('filter', function (event, search) {
                if(search && search.search && (/^\d{3}.\d{3}.\d{3}-\d{2}$/.test(search.search) || /^\d{2}.\d{3}.\d{3}\/\d{4}\-\d{2}$/.test(search.search))){
                    search = {search: search.search.replace(/\D/g, '')};
                    search.advanced_search = false;
                }

                if(search && search.advanced_search){
                    $scope.search.search = null;
                }

                $scope.$broadcast('onSearch', search);
            });

            $scope.inactivate = function (agency) {
                console.log('agency', agency);
                var newStatus = null;
                if (agency.status == 3) {
                    newStatus = 1;
                } else {
                    newStatus = 3;
                }

                Agency.update({ id: agency.id }, { status: newStatus },
                    function success(data) {
                        if (!data.error) {
                            agency.status = data.data.status;
                            agency.status_title = data.data.status_title;
                            toastr.success("Atualizada!");
                        }
                    });
            };

            $scope.trash = function (agency) {

                Agency.trash({ id: agency.id }, agency,
                    function success(data) {
                        if (!data.error) {
                            $scope.agencies.splice($scope.agencies.indexOf(agency), 1);
                            toastr.success("Enviado para Lixeira!");
                            $scope.$broadcast('itemTrashed', agency);
                        }
                    });

            };

            $scope.thisScope = $scope;
            $scope.agencyTableActions = [
                { isSubmenu: false, isDynamic: false, title: 'Detalhes', icon: 'fa-search', btnColor: 'btn-success', functionCall: 'app.agency-show', fontColor: '#fff' },
                { isSubmenu: false, isDynamic: false, title: 'Financeiro', icon: 'fa-money', btnColor: 'btn-success', functionCall: 'app.agency-show-financial', fontColor: '#fff' },
                { isSubmenu: false, isDynamic: false, title: 'Relacionamento', icon: 'fa-users', btnColor: 'btn-success', functionCall: 'app.agency-employee', fontColor: '#fff' },
                { isSubmenu: false, isDynamic: false, title: 'Editar', icon: 'fa-edit', btnColor: 'btn-info', functionCall: 'app.agency-edit', fontColor: '#fff' },
                { isSubmenu: true, isDynamic: false, title: 'Excluir', icon: 'fa-trash', btnColor: 'btn-danger', fontColor: '#fff', modalTitle: 'Deseja excluir?', confirmTitle: 'Excluir', confirmColor: 'btn-danger', confirmFunction: 'trash' },
                { isSubmenu: true, isDynamic: false, title: 'Ativar/Desativar', icon: 'fa-check-circle-o', btnColor: 'btn-danger', fontColor: '#fff', modalTitle: 'A agência será ativada/desativada, tem certeza?', confirmTitle: 'Ativar/Desativar', confirmColor: 'btn-danger', confirmFunction: 'inactivate' }
            ];

            init();

        }]);