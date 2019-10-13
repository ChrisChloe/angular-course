/**
 * cardFlag create controller
 */
angular
    .module('app.controllers')
    .controller('CardFlagsCreateCtrl', ['$scope', '$state', '$filter', 'BrandCard', 'toastr', 'Agency',
        function ($scope, $state, $filter, BrandCard, toastr, Agency) {
            $scope.title = "Adicionar Bandeira";
            $scope.cardFlag = null;

            var init = function () {
                $scope.cardFlag = new BrandCard();
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
                cardFlag.$save(
                    function success(data) {
                        if (!data.error) {
                            $state.go('app.cardflags');
                            toastr.success("Salvo!");
                        }

                    }
                );
            };

            init();
        }]);