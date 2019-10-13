/**
/**
 * FinancialPayable controller
 */
angular
    .module('app.controllers')
    .controller('FinancialPayableCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialPayable',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialPayable) {
            $scope.resource           = FinancialPayable;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.crmUrl             = appConfig.crmUrl;
          
            $scope.to_remittance      = [];
            $scope.payments           = [];
            $scope.user               = $cookies.getObject('auth_user');
            $scope.remittance         = {
                remittance_bank_id: '',
                due_date: 'd1'
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
                $scope.filterCriteria.addParam('resource', 'api.payments.active');
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
            * Add payments reference to $scope.to_remittance
            * @param string reference Payment reference
            * @return void
            */
            $scope.addToRemittance = function(reference) {
                var checkbox = $('#' + reference).find('.add_to_remittance');
                if (!checkbox.is(':checked')) {
                    $scope.to_remittance.splice(reference, 1);
                } else {
                    $scope.to_remittance[reference] = reference;
                }
            };

            /*
            *
            * Add payments reference to $scope.to_remittance
            * @param string reference Payment reference
            * @return void
            */
            $scope.addAllToRemittance = function() {
                var checkbox;
                $.each($scope.payments, function( index, payment ) {
                    if (payment.payment_status_id in [1,4]) { // A PAGAR and DEVOLVIDO
                        checkbox = $('#' + payment.reference).find('.add_to_remittance');
                        if (checkbox.is(':checked')) {
                            checkbox.prop('checked', false);
                            $scope.to_remittance.splice(payment.reference, 1);
                        } else {
                            checkbox.prop('checked', true);
                            $scope.to_remittance[payment.reference] = payment.reference;
                        }
                    }

                });
            };

            /*
            *
            * Request a remittance from financial api
            * @param void
            * @return void
            */
            $scope.createRemittance = function() {
                $('#create-remittance').prop('disabled', true);
                var references_obj = [];

                $scope.to_remittance.forEach(function(p){
                    references_obj.push({reference:p});
                });

                FinancialPayable.createRemittance({}, {
                        resource: 'api.payments.remittance',
                        author: $scope.user.data.id,
                        bank_id: $scope.remittance.remittance_bank_id,
                        due_date: $scope.remittance.due_date,
                        payments: references_obj,
                        client_id: 2
                    },
                    function success(response) {
                        $('#banksOpt').modal('hide');
                        $('#create-remittance').prop('disabled', false);

                        if (response.data.errors) {
                            toastr.error(response.data.errors);
                            return false;
                        }

                        $scope.createFile(response.data);
                        toastr.success('Arquivo remessa criado.');
                        $scope.filter($scope.search);
                    },
                    function error(response) {
                        $('#banksOpt').modal('hide');
                        $('#create-remittance').prop('disabled', false);
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
            * Get available banks from financial api
            * @param void
            * @return void
            */
            $scope.getRemittanceBanks = function() {
                FinancialPayable.getBanks({}, {resource: 'api.payments.banks'},
                    function success(data) {
                        $scope.remittance_banks = data.data;
                    });
            };

            /*
            *
            * Get available clients from financial api
            * @param void
            * @return void
            */
            $scope.getClients = function() {
                FinancialPayable.getClients({}, {resource: 'api.clients'},
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
                FinancialPayable.getStatus({}, {resource: 'api.payments.status'},
                    function success(data) {
                        $scope.status = data.data;
                    });
            };

            /*
            *
            * Get available banks from financial api
            * @param void
            * @return void
            */
            $scope.getBanks = function() {
                FinancialPayable.getBanks({}, {resource: 'api.banks'},
                    function success(data) {
                        $scope.banks = data.data;
                    });
            };

            init();

        }]);
