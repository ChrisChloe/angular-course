/**
 * Campaign index controller
 */
angular
    .module('app.controllers')
    .controller('CampaignCtrl', ['$scope', '$state', 'appConfig', 'Campaign', 'toastr',
        function ($scope, $state, appConfig, Campaign, toastr) {

            $scope.resource = Campaign;

            $scope.campaigns = [];

            $scope.delete = function (campaign) {
                Campaign.delete({id: campaign.id}, campaign,
                    function success(data) {
                        if (!data.error){
                            $scope.$broadcast('itemTrashed', campaign);
                            $scope.campaigns.splice($scope.campaigns.indexOf(campaign), 1);
                            toastr.success("Excluído");
                        }
                    });
            };

            var init = function () {

            };

            init();
        }]);

