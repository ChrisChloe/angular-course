/**
 * Emission controller
 */
angular
    .module('managerApp')
    .controller('EmissionCardUseCtrl', ['$scope', '$rootScope', 'card_id', 'company_id', 'Card', 'CardUse', 'toastr', '$uibModal', '$uibModalInstance',
        function ($scope, $rootScope, card_id, company_id, Card, CardUse, toastr, $uibModal, $uibModalInstance) {

            $scope.sending = false;
            $scope.cardUseTypes = [
                {title:'Recusado',  value:2},
                {title:'Outro',     value:1}
            ];

            $scope.card_use = new CardUse({
                type: 2,
                status: 1,
                card_id: card_id,
                company_id: company_id,
                observation: null
            });

            var init = function(){

            };

            $scope.save = function(cardUse){
                $scope.sending = true;
                cardUse.$save(
                    function success(data) {
                        if (!data.error) {
                            $uibModalInstance.close({success:true});
                            toastr.success("Salvo!");
                        }else{
                            $scope.sending = false;
                        }
                    }
                );
            };

            $scope.close = function(){
                $uibModalInstance.close({success:false});
            };

            init();
        }]);

