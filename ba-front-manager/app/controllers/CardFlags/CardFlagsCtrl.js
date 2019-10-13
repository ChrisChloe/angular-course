/**
 * Agency index controller
 */
angular
    .module('app.controllers')
    .controller('CardFlagsCtrl', ['$scope', '$rootScope', '$location', 'appConfig', 'Agency', 'Group', 'toastr', 'BrandCard',
        function ($scope, $rootScope, $location, appConfig, Agency, Group, toastr, BrandCard) {

            $scope.resource = BrandCard;

            $scope.cardflags = [];
            $scope.groups = [];
            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.ufs = [];
            $scope.ufs = appConfig.ufs;
            $scope.status = appConfig.agency_status;
            $scope.region = appConfig.region;
            $scope.payment_type = appConfig.PaymentTypes;

            $scope.search = {
                search: $location.search().search
            };

            var init = function () {
                $scope.$on("itemRestored", function (event, agency) {
                    $scope.agencies.unshift(agency);
                });

                Group.query({}, function (data) {
                    $scope.groups = data.data;
                });
            };

            $scope.filter = function (search) {
                if(search.search && (/^\d{3}.\d{3}.\d{3}-\d{2}$/.test(search.search) || /^\d{2}.\d{3}.\d{3}\/\d{4}\-\d{2}$/.test(search.search))){
                    search = {search: search.search.replace(/\D/g, '')};
                }
                $scope.$broadcast('onSearch', search);
            };

            $scope.inactivate = function (agency) {
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

            init();

        }]);

