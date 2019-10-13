/**
 * FinancialReceipts controller
 */
angular
    .module('app.controllers')
    .controller('FinancialReceiptsCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialReceipts',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialReceipts) {

            $scope.resource           = FinancialReceipts;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.crmUrl             = appConfig.crmUrl;

            $scope.receipts           = [];
            $scope.user               = $cookies.getObject('auth_user');
            $scope.billets         = {
                reference: '',
                due_date: '',
                bank_id: ''
            };
            $scope.billet        = {
                reference: '',
                due_date: ''
            };

            $scope.liquidating = false;

            $scope.total = 0.0;

            $scope.liquidate = {
                ids: [],
                count: 0
            };

            $scope.search = {
                status_id: '',
                min_date: null,
                max_date: null
            };

            /*Btn processar - Gerar Boletos*/
            $scope.inProcess = false;
            $scope.btnProcessBoleto = 'Processar';

            /* Verifica se o status do boleto para liberar o botão de cancelamento */
            $scope.isProcessReceive = function(receipt){
                var condition = (receipt.receipt_status.id === 1 || receipt.receipt_status.id === 2 || receipt.receipt_status.id === 5) ? false : true;
                return condition;
            };

            /**
             *
             * Initializer
             * @param void
             * @return void
             */
            var init = function () {
                if ($state.params.id) {
                    $scope.filterCriteria.addParam('id', $state.params.id);
                }
                $scope.filterCriteria.addParam('resource', 'api.receipts.active');
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
            * Cancellation of tickets
            * @param receipts
            * @void void
            */
            $scope.cancelReceipts = function (receipts) {

                if ($scope.isProcessReceive(receipts) !== true) {

                    FinancialReceipts.cancelBillets({}, {
                            reference: receipts.reference,
                            client_id: 1
                        },

                        function success(response){

                            if(response.error){
                                toastr.error(response.message);
                                return false;
                            }

                            toastr.success('Boleto cancelado ! ');
                            $scope.$broadcast('onRefresh');
                        },

                        function error(response){
                            toastr.error(response.errors);
                        });
                }
            };

            $scope.changeDueDate = function() {

                $scope.inProcess = true;
                $scope.btnProcessBoleto = "Atualizando...";

                FinancialReceipts.changeDueDate({}, {
                        due_date: moment(moment($scope.billet.due_date, 'DD/MM/YYYY')).format('YYYY-MM-DD'),
                        reference: $scope.billet.reference,
                        client_id: 1
                    },

                    function success(response) {
                        $scope.inProcess = false;
                        $scope.btnProcessBoleto = "Atualizar";

                        $('#update-receipt').modal('hide');

                        if (response.error) {
                            toastr.error(response.message);
                            return false;
                        }

                        toastr.success('Fatura atualizada.');
                        $scope.$broadcast('onRefresh');

                    },
                    function error(response) {
                        toastr.error(response.errors);

                        $scope.inProcess = false;
                        $scope.btnProcessBoleto = "Atualizar";
                    });
            };



            /*
            * 
            * Toggle remittance button
            * @param void
            * @return void
            */
            $scope.toggleRemittanceButton = function () {
                if (Object.keys($scope.to_remittance).length <= 0 && !$scope.remittance.remittance_bank_id) {
                    $('#create-remittance').prop('disabled', true);
                } else {
                    $('#create-remittance').prop('disabled', false);
                }
            };

            /*
            *
            * Request a remittance from financial api
            * @param void
            * @return void
            */

            $scope.createBillets = function() {

                $scope.inProcess = true;
                $scope.btnProcessBoleto = "Processando...";

                FinancialReceipts.createBillets({}, {
                        bank_id: $scope.billets.bank_id,
                        receipts: $scope.liquidate.ids,
                        client_id: 1
                    },
                    function success(response) {
                        $scope.inProcess = false;
                        $scope.btnProcessBoleto = "Processar";
                        $scope.$broadcast('onRefresh');

                        $('#banksOpt').modal('hide');

                        if (response.error) {
                            toastr.error(response.message);
                            return false;
                        }

                        toastr.success('Faturas processadas.');

                    },
                    function error(response) {
                        toastr.error(response.errors);
                        $scope.inProcess = false;
                        $scope.btnProcessBoleto = "Processar"; 
                    });

            };         

            /*
            *
            * Get available banks from financial api
            * @param void
            * @return void
            */
            $scope.getBanks = function() {
                FinancialReceipts.getBanks({}, {resource: 'api.receipts.banks'},
                    function success(data) {
                        $scope.banks = data.data;
                    });
            };

            /*
            *
            * Get available clients from financial api
            * @param void
            * @return void
            */
            $scope.getClients = function() {
                FinancialReceipts.getClients({}, {resource: 'api.clients'},
                    function success(data) {
                        $scope.clients = data.data;
                    });
            };

            /*
            *
            * Get available status from financial api
            * @param void
            * @return void
            */
            $scope.getStatus = function() {
                FinancialReceipts.getStatus({}, {resource: 'api.receipts.status'},
                    function success(data) {
                        $scope.status = data.data;
                    });
            };


            /**
             * Select all once
             *
             * @param receipts
             * @param selectedAll
             */
            $scope.selectAll = function(receipts, selectedAll){
                receipts.forEach(function (receipt) {
                    if(receipt.liquidated_at || receipt.liquidator_id){
                        receipt.selected = false;
                    }else{
                        receipt.selected = selectedAll;
                    }
                });
            };

            /**
             * Control selected receitps
             */
            $scope.$watch('receipts|filter:{selected:true}', function (receipts) {

                $scope.liquidate.count = receipts.length;
                $scope.liquidate.ids   = receipts.map(function(statement) {
                    return {reference:statement.reference};
                });
            }, true);

            init();

        }]);
