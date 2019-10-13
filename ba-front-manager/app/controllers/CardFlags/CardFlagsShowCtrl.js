/**
 * BrandCard show controller
 */
angular
    .module('app.controllers')
    .controller('CardFlagsShowCtrl', ['$scope', '$state', 'appConfig', '$filter', 'BrandCard', 'toastr',
        function ($scope, $state, appConfig, $filter, BrandCard, toastr) {
            
            var brandCardId = $state.params.id;
            $scope.brandCard = null;
            $scope.title = 'Detalhes Bandeira';


            var init = function () {
                BrandCard.get({ id: brandCardId },
                    function success(data) {
                        $scope.cardFlag = data.data;
                    });
            };

            init();
        }]);
