/**
 * Company create controller
 */
angular
    .module('app.controllers')
    .controller('CompanyCreateCtrl', ['$scope', '$state', 'appConfig', 'Company', 'Upload', 'toastr',
        function ($scope, $state, appConfig, Company, Upload, toastr) {
            $scope.title   = "Adicionar Companhia";
            $scope.company = null;

            var init = function () {
                $scope.company = new Company();
                $scope.company.required_cpf = 0;
                $scope.company.international = 1;
                $scope.company.international_fare = 1;
            };

            $scope.save = function (company) {

                Upload.upload({
                    url: appConfig.baseUrl + '/companies',
                    data: company
                }).then(
                    function success(resp) {
                        var data = resp.data;
                        if (!data.error) {
                            $state.go('app.company');
                            toastr.success("Salvo!");
                        }
                    },
                    function error(data) {
                        toastr.error('Não foi possível salvar!');
                    },
                    function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.progressbar = progressPercentage;
                    });
            };

            init();
        }]);
