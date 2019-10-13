/**
 * FinancialRemittance controller
 */
angular
    .module('app.controllers')
    .controller('FinancialRemittanceCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialRemittance', 'Upload','$interval',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialRemittance, Upload, $interval) {

            $scope.resource           = FinancialRemittance;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.crmUrl             = appConfig.crmUrl;
            $scope.remittances        = [];
            $scope.remittance         = {};

            $scope.search = {
                min_date: null,
                max_date: null
            };


            /**
             *
             * Initializer
             * @param void
             * @return void
             */
            var init = function () {
                $scope.filterCriteria.addParam('resource', 'api.payments.remittance.list');
                if ($state.params.id) {
                    $scope.filterCriteria.addParam('id', $state.params.id);
                }
            };

            $scope.canceling = false;

            $scope.total = 0.0;

            $scope.selectedRemittances = {
                ids: [],
                count: 0
            };

            /**
             * Select all once
             *
             * @param emissions
             * @param selectedAll
             */
            $scope.selectAll = function(remittancePayments, selectedAll){
                remittancePayments.forEach(function (payment) {
                    if (payment.payment_status_id !=3) {
                        payment.selected = selectedAll;
                    }
                });
            };
            /**
             *
             * Filter
             * @param void
             * @return void
             */
            $scope.filter = function(search){
                if (search.min_date && search.max_date) {
                    search.start_date = moment(moment(search.min_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                    search.end_date   = moment(moment(search.max_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                }else{
                    search.start_date = null;
                    search.end_date   = null;
                }

                $scope.$broadcast('onSearch', search);
            };

            /*
             *
             * Get available banks from financial api
             * @param void
             * @return void
             */
            $scope.getRemittanceBanks = function() {
                FinancialRemittance.getBanks({}, {resource: 'api.payments.banks'},
                    function success(data) {
                        $scope.remittance_banks = data.data;
                    });
            };

            /*
             *
             * Get remittance data from financial api
             * @param void
             * @return void
             */
            $scope.view = function() {
                FinancialRemittance.view({}, {resource: 'api.payments.remittance.list', id: $state.params.id},
                    function success(data) {
                        $scope.remittance = data.data;
                    });
            };

            /*
            *
            * Download a remittance file from financial api
            * @param void
            * @return void
            */
            $scope.download = function(id) {
                FinancialRemittance.download({}, {
                        resource: 'api.payments.remittance.download',
                        remittance_payment_id: id,
                    },
                    function success(response) {
                        if (response.data.errors) {
                            toastr.error(response.data.errors);
                            return false;
                        }

                        $scope.createFile(response.data);
                    },
                    function error(response) {
                        toastr.error(response.data.errors);
                    });
            };

            /*
           *
           * Create a remittance file and force its download
           * @param array Request data
           * @return void
           */
            $scope.createFile = function(data) {
                var file = new Blob([data.string], {type: 'text/plain'}),
                    url      = (window.URL || window.webkitURL).createObjectURL(file),
                    a        = document.createElement('a');

                document.getElementsByTagName("body")[0].appendChild(a);

                a.href     = url;
                a.download = data.filename;
                a.target   = '_blank';
                a.click();
            };

            $scope.cancelRemittanceBanks = function () {

                FinancialRemittance.cancelRemittance({
                        'remittance_ids[]': $scope.selectedRemittances.ids
                    }, {resource: 'api.payments.remittance.cancel'},
                    function success(data) {
                        $scope.remittance_banks = data.data;
                        if (!data.error) {
                            toastr.success("Pagamentos cancelados!");
                            $interval( function(){ location.reload(); }, 2000);

                        }
                    });
            };

            /**
             * Control selected receitps
             */
            $scope.$watch('remittance[0].payments|filter:{selected:true}', function (payments) {

                $scope.selectedRemittances.count = payments.length;
                $scope.selectedRemittances.ids   = payments.map(function(p) {
                    return p.id;
                });
            }, true);

            init();

        }]);
