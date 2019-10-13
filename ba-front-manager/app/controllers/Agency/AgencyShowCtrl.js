/**
 * Agency show controller
 */
angular
    .module('app.controllers')
    .controller('AgencyShowCtrl', ['$scope', '$state', 'appConfig', 'Agency', 'Op', 'Emission', 'InboxMail', '$uibModal', '$location',
        function ($scope, $state, appConfig, Agency, Op, Emission, InboxMail, $uibModal, $location) {

            var agencyId = $state.params.id;
            $scope.agency = null;

            $scope.showingAditionalAddresses = true;

            $scope.ops = [];
            $scope.emissions = [];
            $scope.messages = [];
            $scope.phonecalls = [];

            //Custom
            $scope.filterInboxMailCriteria = appConfig.filterCriteria();
            $scope.filterOpsCriteria = appConfig.filterCriteria();
            $scope.filterEmissionsCriteria = appConfig.filterCriteria();
            $scope.filterAgencyCallCriteria = appConfig.filterCriteria();
            $scope.address_types = appConfig.addressTypes;


            $scope.OpResource = Op;
            $scope.InboxMailResource = InboxMail;
            $scope.EmissionResource = Emission;
            $scope.AgencyCallResource = Agency;


            $scope.search = {
                search: $location.search().search
            };
            $scope.filter = function (search) {
                $scope.$broadcast('onSearch', search);
            };
            var init = function () {

                Agency.get({ id: agencyId },
                    function success(data) {
                        $scope.agency = data.data;
                        $scope.filterAgencyCallCriteria.addParam('number', $scope.agency.phone.replace(/\D/g, ''));
                        // Agency.getPhoneCalls({
                        //     number: '11941483085',
                        //     limit: 999,
                        // }, 
                        //     function(data){
                        //         $scope.phonecalls = data.calls;

                        // });
                        // $scope.agency.phone.replace(/\D/g,'')
                    });

                    Agency.getAditionalAddress({
                        addressable_id: agencyId,
                        addressable_type: 'agency',
                    }, function (data) {
                        $scope.aditionalAddresses = data.data;
    
                    });

                $scope.filterOpsCriteria.addParam('agency', agencyId);
                $scope.filterInboxMailCriteria.addParam('user_or_agency_id', agencyId);
                $scope.filterOpsCriteria.addParam('limit', 10);
                $scope.filterEmissionsCriteria.addParam('agency', agencyId);
                $scope.filterEmissionsCriteria.addParam('limit', 10);
            };

            $scope.downloadPhonecall = function (phonecall) {
                phonecall.downloadingAudio = true;

                Agency.downloadPhoneCall({ id: phonecall.id },
                    function (response) {
                        phonecall.downloadingAudio = false;
                        if (response) {
                            $scope.phonecalls.forEach(function (call) {
                                if (call.id === phonecall.id) {
                                    call.key = appConfig.crmUrl + 'audios/' + response.data.key;
                                };
                            });
                        }
                    },
                    function (err) {
                        phonecall.downloadingAudio = false;

                    });
            }

            /**
             *
             * @param message
             */
            $scope.show = function (message) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/inbox-mail/show.html',
                    controller: 'InboxMailShowCtrl',
                    size: 'lg',
                    resolve: {
                        id: message.id
                    }
                });

                modalInstance.result.then(function () {
                    load();
                });
            };

            init();
        }]);
