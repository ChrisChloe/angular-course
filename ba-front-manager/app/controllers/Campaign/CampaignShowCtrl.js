/**
 * Campaign show controller
 */
angular
    .module('app.controllers')
    .controller('CampaignShowCtrl', ['$scope', '$state', '$filter', 'appConfig', 'Campaign', 'CampaignEmail',
        function ($scope, $state, $filter, appConfig, Campaign, CampaignEmail) {

            var campaignId  = $state.params.id;
            $scope.campaign = null;

            $scope.resource       = CampaignEmail;
            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.emails = [];

            var init = function () {
                $scope.filterCriteria.addParam('campaign', campaignId);

                Campaign.get({id: campaignId},
                    function success(data) {
                        $scope.campaign = data.data;
                    });
            };

            init();
        }]);
