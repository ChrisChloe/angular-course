/**
 * Emission Request index controller
 */
angular
    .module('app.controllers')
    .controller('EmissionRequestCtrl', ['$scope', '$state', '$location', '$uibModal', 'appConfig', 'EmissionRequest', 'userUtils', 'toastr',
        function ($scope, $state, $location, $uibModal, appConfig, EmissionRequest, userUtils, toastr) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = EmissionRequest;

            $scope.requests = [];

            $scope.search = {
                search: $location.search().search,
                from: null,
                to: null
            };

            var init = function () { };

            $scope.filter = function (search) {
                if (search.min_date && search.max_date) {
                    search.start_date = moment(search.min_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    search.end_date = moment(search.max_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    $scope.$broadcast('onSearch', search);
                } else if (search.min_date && !search.max_date) {
                    search.max_date = moment().format('DD/MM/YYYY');
                    search.end_date = moment().format('YYYY-MM-DD');
                    search.start_date = moment(search.min_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    $scope.$broadcast('onSearch', search);

                } else if(!search.min_date && search.max_date){
                    toastr.warning('Selecione uma data inicial');

                }else if (!search.min_date && !search.max_date) {
                    search.start_date = null;
                    search.end_date = null;
                    $scope.$broadcast('onSearch', search);
                }
            };

            $scope.clearDate = function (id) {
                if (id == 1) {
                    $scope.search.min_date = "";
                } else {
                    $scope.search.max_date = "";
                }
            }

            /**
             * Open emissions details
             * @param emission
             */
            $scope.openDetails = function (emission) {
                emission.open = !emission.open;
            };



            $scope.copyToken = function (element) {
                var copyText = document.getElementById(element);
                copyText.select();
                
                document.execCommand("copy");

                toastr.success('Copiado');
            }
            

            init();
        }]);

