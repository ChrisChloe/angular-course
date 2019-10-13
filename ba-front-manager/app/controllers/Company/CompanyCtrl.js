/**
 * Company index controller
 */
angular
    .module('app.controllers')
    .controller('CompanyCtrl', ['$scope', '$state', 'appConfig', 'Company', 'toastr',
        function ($scope, $state, appConfig, Company, toastr) {

            $scope.resource = Company;

            $scope.companies = [];

            var init = function () {
                //
            };

            $scope.inactivate = function (company) {
                var status = + !company.status;

                Company.update({id: company.id}, {status: status},
                    function success(data) {
                        if (!data.error) {
                            company.status = status;
                            toastr.success("Atualizado!");
                            $state.go('app.company');
                        }
                    });
            };

            $scope.delete = function (company) {
                //@Todo:delete
            };

            $scope.trash = function (company) {
                //@Todo:trash
            };

            init();
        }]);

