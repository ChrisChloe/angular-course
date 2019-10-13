/**
 * Emission index controller
 */
angular
    .module('app.controllers')
    .controller('CheckInCtrl', ['$scope', '$state', '$location', '$uibModal', 'appConfig', 'toastr', 'Emission', 'Company',
        function ($scope, $state, $location, $uibModal, appConfig, toastr, Emission, Company) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource = Emission;

            $scope.emissions = [];
            $scope.companies = [];

            $scope.codes = appConfig.checkInCodes;

            $scope.search = {
                search: $location.search().search,
                from: moment().format('DD/MM/YYYY'),
                to:   moment().add(1, 'days').format('DD/MM/YYYY')
            };
            $scope.search.min_time = '00:00:00';
            $scope.search.max_time   = '23:59:59';
            /**
             * init
             * @param void
             */
            var init = function () {
                
                if($state.params.search) {
                    $scope.filterCriteria.addParam('search', $state.params.search);
                    $scope.search.search = $state.params.search;
                }

                $scope.filterCriteria.addParam('from', $scope.search.from);
                $scope.filterCriteria.addParam('to', $scope.search.to);
                $scope.filterCriteria.addParam('min_time', $scope.search.min_time);
                $scope.filterCriteria.addParam('max_time', $scope.search.max_time);

                Company.query({}, function(response){
                    if(response.data){
                        $scope.companies = response.data;
                    }
                });

            };

            $scope.filter = function(search){
                $scope.$broadcast('onSearch', search);
            };

            /**
             * Performs manual check-in
             * @param emission
             */
            $scope.checkIn = function (emission) {
                Emission.checkIn({id:emission.id}, {},
                    function success(response){
                        var emissionUpdated  = response.data;
                        emissionUpdated.open = emission.open;

                        $scope.emissions.splice($scope.emissions.indexOf(emission), 1, response.data);

                        toastr.success('Check-in realizado!');
                    });
            };

            /**
             * Performs manual check-in
             * @param emission
             */
            $scope.sendMail = function (emission) {
                Emission.sendMail({id:emission.id}, {},
                    function success(response){
                        if(!response.data.error) {
                            toastr.success('Email enviado com sucesso!');
                        }else {
                            toastr.error(response.data.message);
                        }
                    });
            };

            /**
             * Verifies check-in in company site by using API crawler
             *
             * @param emission
             * @param checkReturn
             */
            $scope.verifyCheckIn = function (emission, checkReturn) {
                emission.searchingCheckin = true;

                checkReturn = checkReturn ? 1 : 0;

                Emission.verifyCheckIn({id:emission.id, check_return: checkReturn}, {},
                    function success(response){
                        emission.searchingCheckin = false;

                        if(!response.error){
                            var emissionUpdated = response.data;
                            emissionUpdated.open = emission.open;

                            $scope.emissions.splice($scope.emissions.indexOf(emission), 1, response.data);

                            toastr.success('Check-in ' + emissionUpdated.confirmation_code + ' verificado!');
                        }else{
                            toastr.error('Erro ao verificar check-in!');
                        }

                    });
            };

            /**
             * Adds check-in problem observation
             * @param emission
             */
            $scope.addObservation = function (emission) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/check-in/problem.html',
                    controller: 'CheckInProblemCtrl',
                    size: 'md',
                    resolve: {
                        emission: emission
                    }
                });

                modalInstance.result.then(function (response) {
                    var emissionUpdated = response.data;
                    emissionUpdated.open = emission.open;
                    $scope.emissions.splice($scope.emissions.indexOf(emission), 1, emissionUpdated);
                });
            };

            /**
             * Open emissions details
             * @param emission
             */
            $scope.openDetails = function (emission) {
                emission.open = !emission.open;
            };

            /**
             * Get last status from checkins
             * @param emission
             */
            $scope.getLastCheckin = function (emission) {
                if(!emission.checkins || emission.checkins.length <= 0){
                    return null;
                }

                var lastCheckin = {};

                emission.checkins.forEach(function(checkin){
                    if(!lastCheckin.created_at || moment(lastCheckin.created_at).diff(moment(checkin.created_at)) < 0){
                        lastCheckin = checkin;
                    }
                });

                return lastCheckin;
            };

            init();
        }]);

