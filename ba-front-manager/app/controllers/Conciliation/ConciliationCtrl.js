/**
 * Conciliation index controller
 */
angular
    .module('app.controllers')
    .controller('ConciliationCtrl', ['$scope', '$state', 'appConfig', 'Card', 'toastr', 'Upload', 'Conciliation',
        function ($scope, $state, appConfig, Card, toastr, Upload, Conciliation) {

            $scope.resource = Conciliation;

            $scope.readings = [];

            $scope.waitingResponse = false;
            $scope.options = {};
            $scope.cards = [];

            $scope.due_date = '';

            $scope.responseData = [];

            var init = function () {

                $scope.options.bank_id = '1';

                Card.active({},
                    function success(res) {
                        $scope.cards = res.data;
                        $scope.cards.forEach(function (card) {
                            card.card_number = '************' + card.card_number.substring(card.card_number.length - 4, card.card_number.length);
                        });
                    });

            };

            $scope.submitOptions = function (options) {

                if (options.bank_id && options.card_id && options.file && options.due_date) {

                    $scope.waitingResponse = true;

                    Upload.upload({
                        url: appConfig.baseUrl + '/credit-card-statements/upload',
                        data: options
                    }).then(
                        function success(resp) {
                            $scope.waitingResponse = false;

                            if (JSON.parse(resp.data.data.transactions).length <= 0) {
                                toastr.error("Nada encontrado!");

                            } else {
                                toastr.success("Sucesso!");
                                $scope.responseData = JSON.parse(resp.data.data.transactions);
                                window.location.reload();
                            }
                        },
                        function error(err) {
                            $scope.waitingResponse = false;

                        });

                } else {
                    toastr.warning("Preencha os campos");
                }

            }

            $scope.changeState = function (data) {

                console.log(data);
                

                $state.go("app.conciliation-show", {
                    responseData: data
                });
            }

            init();

        }]);

