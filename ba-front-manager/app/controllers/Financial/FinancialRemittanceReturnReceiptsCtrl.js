/**
 * FinancialRemittanceReturnReceipts controller
 */
angular
    .module('app.controllers')
    .controller('FinancialRemittanceReturnReceiptsCtrl', ['$scope', '$http', '$state', '$cookies', 'toastr', '$filter', 'appConfig', 'FinancialRemittanceReturnReceipts', 'Upload',
        function ($scope, $http, $state, $cookies, toastr, $filter, appConfig, FinancialRemittanceReturnReceipts, Upload) {
            $scope.resource           = FinancialRemittanceReturnReceipts;
            $scope.filterCriteria     = appConfig.filterCriteria();
            $scope.filterCriteriaDetails = appConfig.filterCriteria();
            $scope.crmUrl             = appConfig.crmUrl;
            $scope.search             = {
                min_date: null,
                max_date: null
            };

            $scope.returns            = [];
            $scope.return             = [];
            $scope.details            = [];
            $scope.detail             = [];
            $scope.user               = $cookies.getObject('auth_user');
            $scope.remittance_return  = {
                remittance_return_bank_id: '',
                file: ''
            };

            /**
             *
             * Initializer
             * @param void
             * @return void
             */
            var init = function () {
                $scope.filterCriteria.addParam('resource', 'api.receipts.return.list');
                if ($state.params.id) {
                    $scope.filterCriteria.addParam('id', $state.params.id);
                }
                $scope.filterCriteriaDetails.addParam('resource', 'api.return.translate')
                $scope.filterCriteriaDetails.addParam('id', $state.params.id);
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
                FinancialRemittanceReturnReceipts.getBanks({}, {resource: 'api.receipts.banks'},
                    function success(data) {
                        $scope.remittance_return_banks = data.data;
                    });
            };


            // upload later on form submit or something similar
            $scope.submit = function() {
                if ($scope.remittance_return.file) {
                    $scope.upload($scope.remittance_return.file);
                }
            };

            // upload on file select or drop
            $scope.upload = function (file) {
                $('#send-remittance-return').text('Enviando...').prop('disabled', true);
                Upload.upload({
                    url: appConfig.baseFinUrl + '/financeiro',
                    data: {
                        file: file, 
                        resource: 'api.receipts.return.read-and-process', 
                        bank_id: $scope.remittance_return.remittance_return_bank_id,
                        author: $scope.user.data.id,
                        client_id: 1
                    }
                }).then(function (resp) {
                    toastr.success('Arquivo retorno enviado.');
                    $('#send-remittance-return').text('Enviar').prop('disabled', false);

                    $('#remittance-return').modal('hide');
                    $scope.filter($scope.search);
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ', resp.data);
                
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

            /*
            *
            * Get remittance return data from financial api
            * @param void
            * @return void
            */
            $scope.view = function() {
                FinancialRemittanceReturnReceipts.view({}, {resource: 'api.receipts.return.list', id: $state.params.id},
                    function success(data) {
                        $scope.return = data.data;
                    });
            };

            $scope.viewDetails = function() {
                FinancialRemittanceReturnReceipts.view({}, {resource: 'api.return.translate', id: $state.params.id},
                    function success(data) {
                        $scope.details = data;
                    });
            };

            $scope.iconCollapse = function(detail){
                detail.icon = !detail.icon;
            }
            
            /*
            *
            * Download a remittance file from financial api
            * @param void
            * @return void
            */
            $scope.download = function(remittance) {
                FinancialRemittanceReturnReceipts.download({
                        resource: 'api.receipts.return.download',
                        remittance_return_id: remittance.id
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
            * Create a remittance return file and force its download
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
            * Get payment status class
            * @param array payment
            * @return string
            */
            $scope.getPaymentStatusClass = function(bank, payment) {
                switch (bank) {
                    case 'santander':
                        if (payment.remittance_return.return_codes.search('00') < 0 && payment.remittance_return.return_codes.search('BD') < 0 && payment.remittance_return.return_codes.search('BE') < 0 && payment.remittance_return.return_codes.search('03') < 0) {
                            return 'notPay';
                        } else if (payment.remittance_return.return_codes.search('00') >= 0) {
                            return 'pay';
                        }
                        break;
                    case 'itau':
                        if (payment.remittance_return.return_codes.search('BD') < 0 && payment.remittance_return.return_codes.search('BE') < 0 &&payment.remittance_return.return_codes.search('CP') < 0 && payment.remittance_return.return_codes.search('EM') < 0 &&payment.remittance_return.return_codes.search('EX') < 0 && payment.remittance_return.return_codes.search('IR') < 0 &&payment.remittance_return.return_codes.search('LA') < 0 && payment.remittance_return.return_codes.search('RS') < 0 && payment.remittance_return.return_codes.search('00') < 0) {
                            return 'notPay';
                        } else if (payment.remittance_return.return_codes.search('00') >= 0) {
                            return 'pay';
                        }
                        break;
                    case 'bradesco':
                        if (payment.remittance_return.return_codes.search('BW') >= 0) {
                            return 'pay';
                        } else if (payment.remittance_return.return_codes.search('BT') < 0 && payment.remittance_return.return_codes.search('BU') < 0 && payment.remittance_return.return_codes.search('BV') < 0 && payment.remittance_return.return_codes.search('BD') < 0) {
                            return 'notPay';
                        }
                        break;
                }
            };  

            init();

        }]);
