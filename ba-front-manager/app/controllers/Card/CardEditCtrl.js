/**
 * Card edit controller
 */
angular
    .module('app.controllers')
    .controller('CardEditCtrl', ['$scope', '$state', '$filter', 'appConfig', 'Card', 'CardType', 'Provider', 'CardObservation', 'CardComment', 'toastr',
        function ($scope, $state, $filter, appConfig, Card, CardType, Provider, CardObservation, CardComment, toastr) {
            var cardId = $state.params.id;

            $scope.title = "Editar Cartão";
            $scope.card  = null;
            $scope.types = [];
            $scope.days  = [];
            $scope.flags  = appConfig.cardFlags;
            $scope.states  = appConfig.states;
            $scope.countries = appConfig.countries;

            //Custom criteria
            $scope.filterCriteria            = appConfig.filterCriteria();
            $scope.filterObservationCriteria = appConfig.filterCriteria();
            $scope.filterCardCommentCriteria = appConfig.filterCriteria();

            $scope.resource        = Provider;
            $scope.CardObservation = CardObservation;
            $scope.CardComment     = CardComment;

            $scope.providers    = [];
            $scope.observations = [];
            $scope.comments     = [];

            var init = function () {

                Card.get({id: cardId},
                    function success(data) {
                        $scope.card = data.data;

                        $scope.card.address_zipcode = $scope.card.address_zipcode && $scope.card.address_zipcode.replace(/\D/,"");

                        formatDates($scope.card);

                        for(var i = 1; i < 30; i++){
                            $scope.days.push({value:i});
                        }
                });

                CardType.query({limit:9999},{},
                    function success(data) {
                        $scope.types = data.data;
                    });

                $scope.filterCriteria.addParam('card', cardId);
                $scope.filterObservationCriteria.addParam('card', cardId);
                $scope.filterCardCommentCriteria.addParam('card', cardId);
            };

            var formatDates = function (card) {
                if (card.expiration) {
                    card.expiration = $filter("date")($filter('toDate')(card.expiration), "MM/yy");
                }

                if (card.birthday) {
                    card.birthday = $filter("date")($filter('toDate')(card.birthday), "dd/MM/yyyy");
                }
            };

            $scope.filter = function(search){
                search.card = cardId;
                $scope.$broadcast('onSearch', search);
            };

            $scope.save = function (card) {

                if(card.code){
                    var codeHasSpaces = / /.test(card.code);
                    var codeIsBig = card.code.length > 25;

                    if(codeHasSpaces){ return toastr.error("Campo Código não pode ter espaços em branco"); }
                    if(codeIsBig){ return toastr.error("Campo Código não pode ter mais que 25 letras"); }
                }

                Card.update({id: card.id}, card,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.card');
                        }
                    });
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
