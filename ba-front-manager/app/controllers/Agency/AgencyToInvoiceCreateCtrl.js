angular
    .module('app.controllers')
    .controller('AgencyToInvoiceCreateCtrl', ['$scope', '$rootScope', '$state', 'agency', 'emissions', 'total', 'due_date', 'appConfig', 'toastr', 'Agency', 'Emission', 'Invoice', 'Credit', '$uibModalInstance',
        function ($scope, $rootScope, $state, agency, emissions, total, due_date, appConfig, toastr, Agency, Emission, Invoice, Credit, $uibModalInstance) {

            $scope.invoice = {
                emissions: emissions,
                credits:   [],
                agency_id: agency,
                due_date: moment(due_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                discount: 0
            };

            $scope.credits = [];
            $scope.resourceCredit = Credit;
            $scope.filterCriteriaCredit = appConfig.filterCriteria();
            $scope.filterCriteriaCredit.addParam('agency_id', $state.params.id);
            $scope.filterCriteriaCredit.addParam('status', 0);

            $scope.total = total;

            /**
             *
             */
            var init = function () {

            };

            /**
             *
             * @param invoice
             */
            $scope.save = function(invoice) {

                $rootScope.$emit("showLoadingScreen", true);


                if (invoice.due_date) {
                    invoice.due_date = moment(invoice.due_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                }else{
                    invoice.due_date = '';
                }

                Invoice.save(invoice,
                    function success(data) {
                        $rootScope.$emit("showLoadingScreen", false);

                        if(data.error){
                            toastr.error(data.message);
                        }else{
                            toastr.success('Fatura gerada com sucesso!');
                            $uibModalInstance.close();
                        }
                    },
                    function error() {
                        $uibModalInstance.close();
                        toastr.error('Erro ao gerar fatura!');
                    });
            };

            /**
             *
             */
            $scope.$watch('credits|filter:{selected:true}', function (credits) {

                $scope.invoice.discount = credits.reduce(function(total, credit) {
                    return total + Number(credit.amount);
                }, 0);

                $scope.invoice.credits = credits.map(function(credit) {
                    return credit.id;
                });
            }, true);

            /**
             *
             * @param invoice
             * @param credit
             */
            $scope.checkCredit = function(invoice, credit){
                if(credit.selected && credit.amount >= total || invoice.discount >= total){
                    toastr.warning('Crédito/Desconto não pode ser maior ou igual ao valor da fatura!');
                    credit.selected = false;
                }
            };

            /**
             *
             */
            $scope.close = function(){
                $uibModalInstance.close();
            };

            init();

        }]);
