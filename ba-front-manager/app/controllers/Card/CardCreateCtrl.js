/**
 * Card create controller
 */
angular
    .module('app.controllers')
    .controller('CardCreateCtrl', ['$scope', '$state', 'appConfig', 'Card', 'CardType', 'toastr',
        function ($scope, $state, appConfig, Card, CardType, toastr) {

            $scope.title = "Adicionar Cartão";
            $scope.card  = null;
            $scope.types = [];
            $scope.days  = [];
            $scope.flags  = appConfig.cardFlags;
            $scope.states  = appConfig.states;
            $scope.countries = appConfig.countries;

            var init = function () {
                $scope.card = new Card();
                $scope.card.status = 1;

                CardType.query({limit:9999},{},
                    function success(data) {
                        $scope.types = data.data;
                    });

                for(var i = 1; i < 30; i++){
                    $scope.days.push({value:i});
                }
            };

            $scope.verifyFields = function () {
                verifyField($scope.card.expiration, "Validade");
                verifyField($scope.card.birthday, "Nascimento");
            };

            var verifyField = function (value, key) {
                if(!value){
                    toastr.warning('Preencha o campo de ' + key);
                }
            };

            $scope.save = function (card) {

                if(card.code){
                    var codeHasSpaces = / /.test(card.code);
                    var codeIsBig = card.code.length > 25;

                    if(codeHasSpaces){ return toastr.error("Campo Código não pode ter espaços em branco"); }
                    if(codeIsBig){ return toastr.error("Campo Código não pode ter mais que 25 letras"); }
                }

                card.$save(
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Salvo!");
                            $state.go('app.card');
                        }
                    }
                );
            };

            $scope.consultCep = function (card) {
                
                Card.cep({cep: card.address.zipcode}, {},
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Consulta Efetuada!");
                            card.address.street  = data.street;
                            card.address.district= data.district;
                            card.address.city    = data.city;
                            card.address.state   = data.uf;
                        }
                    });
            };

            init();
        }]);
