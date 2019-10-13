/**
/**
 * FinancialPayments controller
 */
angular
    .module('app.controllers')
    .controller('FinancialPaymentsCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialPayments',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialPayments) {
            $scope.resource           = FinancialPayments;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.crmUrl             = appConfig.crmUrl;
          
            $scope.to_remittance      = [];
            $scope.payments           = [];
            $scope.user               = $cookies.getObject('auth_user');
            $scope.remittance         = {
                remittance_bank_id: ''
            };

            $scope.search = {
                status_id: '',
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
                $scope.filterCriteria.addParam('resource', 'api.payments.paid');
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
            * Get available clients from financial api
            * @param void
            * @return void
            */
            $scope.getClients = function() {
                FinancialPayments.getClients({}, {resource: 'api.clients'},
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
                FinancialPayments.getStatus({}, {resource: 'api.payments.status'},
                    function success(data) {
                        $scope.status = data.data;
                    });
            };

            /*
            *
            * Archive payment
            * @param entity payment Payment
            * @return void
            */
            $scope.archive = function(payment) {
                if (confirm('Deseja arquivar o pagamento?')) {
                    FinancialPayments.archive({}, {resource: 'api.payments.toarchive', reference: payment.reference, client_id: payment.client_id},
                        function success(data) {
                            $('#' + payment.reference).remove();
                        });
                }
            };

            /*
            *
            * Get available banks from financial api
            * @param void
            * @return void
            */
            $scope.getBanks = function() {
                FinancialPayments.getBanks({}, {resource: 'api.banks'},
                    function success(data) {
                        $scope.banks = data.data;
                    });
            };

            init();

        }]);
