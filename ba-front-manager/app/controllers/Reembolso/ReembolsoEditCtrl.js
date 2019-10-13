/**
 * Emission edit controller
 */
angular
    .module('app.controllers')
    .controller('ReembolsoEditCtrl', ['$scope', '$state', '$filter', 'Emission', 'Card', 'toastr',
        function ($scope, $state, $filter, Emission, Card, toastr) {
            $scope.title    = "Editar Emissão";
            $scope.emission = null;
            $scope.selectedCard = null;

            var init = function () {
                listCards();

                Emission.get({id: $state.params.id}, function (data) {
                    $scope.emission = data.data;
                    $scope.emission.sale_date = moment($scope.emission.sale_date).format('DD/MM/YYYY');
                });
            };

            $scope.save = function (emission) {
                Emission.update({id: emission.id}, emission,
                    function success(data) {
                        if (!data.error) {
                            toastr.success("Atualizado!");
                            $state.go('app.emission');
                        }else{
                            toastr.error("Impossível editar registro!");
                        }
                    });
            };

            var listCards = function(){
                Card.query({limit: 99999},
                    function success(data) {
                        $scope.cards = data.data;
                    });
            };

            $scope.onSelectCard = function(item){
                $scope.selectedCard = item;
            };

            init();
        }]);
