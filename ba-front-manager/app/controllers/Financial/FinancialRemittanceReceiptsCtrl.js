/**
 * FinancialRemittanceReceipts controller
 */
angular
    .module('app.controllers')
    .controller('FinancialRemittanceReceiptsCtrl', ['$scope', '$http', '$state', 'userUtils', 'toastr', '$filter', 'appConfig', 'FinancialRemittanceReceipts',
        function ($scope, $http, $state, userUtils, toastr, $filter, appConfig, FinancialRemittanceReceipts) {

            $scope.resource           = FinancialRemittanceReceipts;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.crmUrl             = appConfig.crmUrl;
            $scope.remittances        = [];
            $scope.remittance         = [];
            $scope.user               = userUtils.getUser();
            $scope.search             = {};

            /**
             *
             * Initializer
             * @param void
             * @return void
             */
            var init = function () {
                $scope.filterCriteria.addParam('resource', 'api.receipts.remittance.list');
                if ($state.params.id) {
                    $scope.filterCriteria.addParam('id', $state.params.id);
                }
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
                FinancialRemittanceReceipts.getBanks({}, {resource: 'api.receipts.banks'},
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
                FinancialRemittanceReceipts.view({}, {resource: 'api.receipts.remittance.list', id: $state.params.id},
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
                FinancialRemittanceReceipts.download({}, {
                        resource: 'api.receipts.remittance.download',
                        remittance_receipt_id: id
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

            /*
            *
            * Request remittances from financial api
            * @param void
            * @return void
            */
            $scope.remittanceCreate = function() {
                FinancialRemittanceReceipts.create({}, {
                        resource: 'api.receipts.remittance.today',
                        author: $scope.user.id,
                        client_id: 1
                    },
                    function success(response) {

                        if (response.error) {
                            toastr.error(response.message);
                            return false;
                        }

                        toastr.success('Arquivos remessa criados.');
                        $scope.filter($scope.search);
                    },
                    function error(response) {
                        toastr.error(response.message);
                    });
            };

            init();

        }]);
