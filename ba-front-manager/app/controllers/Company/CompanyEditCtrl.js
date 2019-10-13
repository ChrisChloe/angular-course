/**
 * Company create controller
 */
angular
    .module('app.controllers')
    .controller('CompanyEditCtrl', ['$scope', '$state', '$filter', 'Company', 'toastr',
        function ($scope, $state, $filter, Company, toastr) {
            $scope.title   = "Editar Companhia";
            $scope.company = null;

            var init = function () {

                Company.get({id: $state.params.id},
                    function success(data) {

                        $scope.company = data.data;
                        $scope.company.auto_emission_miles = $scope.company.auto_emission_miles ? 1 : 0;
                        $scope.company.auto_emission_money = $scope.company.auto_emission_money ? 1 : 0;

                        startWatches();
                    });
            };

            $scope.save = function (company) {

                Company.update({id: company.id}, company,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.company');
                        }
                    });
            };

            var startWatches = function(){
                $scope.$watch('company.shipment_miles_start', function(newValue) {
                    $scope.company.shipment_miles_start_date = moment().add(newValue, 'days').toDate();
                });

                $scope.$watch('company.shipment_miles_end', function(newValue) {
                    $scope.company.shipment_miles_end_date = moment().add(newValue, 'days').toDate();
                });

                $scope.$watch('company.shipment_fare_start', function(newValue) {
                    $scope.company.shipment_fare_start_date = moment().add(newValue, 'days').toDate();
                });

                $scope.$watch('company.shipment_fare_end', function(newValue) {
                    $scope.company.shipment_fare_end_date = moment().add(newValue, 'days').toDate();
                });
            };

            init();
        }]);
