/**
 * FinancialReceiptsExpired controller
 */
angular
    .module('app.controllers')
    .controller('FinancialReceiptsExpiredCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialReceiptsExpired', '$uibModal',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialReceiptsExpired, $uibModal) {

            $scope.resource = FinancialReceiptsExpired;
            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.receiptsExpired = [];
            $scope.receiptsExpiredSelected = [];
            $scope.user = $cookies.getObject('auth_user');
            $scope.billet = {
                reference: '',
                due_date: ''
            };

            $scope.search = {
                status_id: '',
                min_date: null,
                max_date: null
            };

            /*Btn atualizar*/
            $scope.inProcess = false;
            $scope.btnProcessBoleto = 'Atualizar';

            /**
             *
             * Initializer
             * @param void
             * @return void
             */
            var init = function () {
                $scope.filterCriteria.addParam('resource', 'api.receipts.expired');
            };

            /**
             *
             * Filter
             * @param void
             * @return void
             */
            $scope.filter = function (search) {
                if (search.min_date && search.max_date) {
                    search.start_due_date = moment(moment(search.min_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                    search.end_due_date = moment(moment(search.max_date, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                } else {
                    search.start_due_date = null;
                    search.end_due_date = null;
                }

                $scope.$broadcast('onSearch', search);
            };

            /* Verifica se o status do boleto para liberar o botão de cancelamento */
            $scope.isProcessReceive = function (receipt) {
                var condition = (receipt.receipt_status.id === 1 || receipt.receipt_status.id === 2 || receipt.receipt_status.id === 5) ? false : true;
                return condition;
            };

            /*
            * Cancellation of tickets
            * @param receipts
            * @void void
            */
            $scope.cancelReceipts = function (receipts) {

                if ($scope.isProcessReceive(receipts) !== true) {

                    FinancialReceiptsExpired.cancelBillets({}, {
                            reference: receipts.reference,
                            client_id: 1
                        },

                        function success(response){
                            if(response.error){
                                toastr.error(response.message);
                                return false;
                            }

                            toastr.success('Boleto cancelado !');
                            $scope.$broadcast('onRefresh');
                        },

                        function error(response){
                            toastr.error(response.errors);
                        });
                }
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
            $scope.calcInterest = function () {

                $scope.inProcess = true;
                $scope.btnProcessBoleto = "Atualizando...";


                FinancialReceiptsExpired.calcInterest({}, {
                        due_date: moment(moment($scope.billet.due_date, 'DD/MM/YYYY')).format('YYYY-MM-DD'),
                        reference: $scope.billet.reference,
                        client_id: 1
                    },

                    function success(response) {

                        $scope.inProcess = false;
                        $scope.btnProcessBoleto = "Atualizar";

                        $('#update-receipt-expired').modal('hide');

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

            /**
             *
             */
            $scope.calcInterests = function() {

                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/financial/modals/update-receipts-expired.html',
                    controller:  'FinancialReceiptsExpiredUpdateCtrl',
                    size:        'md',
                    resolve: {
                        receipts: function () {
                            return $scope.receiptsExpiredSelected;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    $scope.$broadcast('onRefresh');
                });
            };

            /*
            *
            * Get available banks from financial api
            * @param void
            * @return void
            */
            $scope.getBanks = function () {
                FinancialReceiptsExpired.getBanks({}, {resource: 'api.receipts.banks'},
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
            $scope.getClients = function () {
                FinancialReceiptsExpired.getClients({}, {resource: 'api.clients'},
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
            $scope.getStatus = function () {
                FinancialReceiptsExpired.getStatus({}, {resource: 'api.receipts.status'},
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
            $scope.selectAll = function (receipts, selectedAll) {
                receipts.forEach(function (receipt) {
                    receipt.selected = selectedAll;
                });
            };

            /**
             * Control selected receitps
             */
            $scope.$watch('receipts|filter:{selected:true}', function (receipts) {

                $scope.liquidate.count = receipts.length;
                $scope.liquidate.ids = receipts.map(function (statement) {
                    return {reference: statement.reference};
                });
            }, true);

            $scope.$watch('receiptsExpired|filter:{selected:true}', function (receipts) {
                $scope.receiptsExpiredSelected = receipts;
            }, true);

            init();

        }]);
