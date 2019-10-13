/**
 * BrandCard create controller
 */
angular
    .module('app.controllers')
    .controller('CardFlagsEditCtrl', ['$scope', '$state', '$filter', 'BrandCard', 'toastr',
        function ($scope, $state, $filter, BrandCard, toastr) {
            $scope.title = "Editar Bandeira " + $state.params.id;
            $scope.cardFlag = null;

            var init = function () {
                BrandCard.get({ id: $state.params.id },
                    function (res) {
                        $scope.cardFlag = res.data;
                    });
            };
            
            $scope.searchAgency = function (search) {
                if (search && search.length) {
                    Agency.query({ limit: 30, search: search, orderBy: 'title', sortedBy: 'DESC' }, {},
                        function success(response) {
                            $scope.agencies = response.data;
                        }
                    );
                }
            };

            $scope.onSelectAgency = function (agency) {
                if (agency) {
                    $scope.cardFlag.agency_id = agency.id;
                } else {
                    $scope.cardFlag.agency_id = null;
                    $scope.cardFlag.agency = null;
                }
            };

            $scope.save = function (cardFlag) {

                BrandCard.update({ id: cardFlag.id }, cardFlag,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.cardflags');
                        }
                    });
            };

            init();
        }]);
