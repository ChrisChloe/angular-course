/**
 * Dashboard Ctrl index controller
 */
angular
    .module('app.controllers')
    .controller('DashboardCtrl', ['$scope', '$state', 'appConfig', 'Dashboard', 'Company', 'DTOptionsBuilder', 'User', 'userUtils', 'Agency',
        function ($scope, $state, appConfig, Dashboard, Company, DTOptionsBuilder, User, userUtils, Agency) {

            //Counters
            $scope.userCount = 0;
            $scope.agencyCount = 0;

            $scope.opCount = 0;
            $scope.searchCount = 0;
            $scope.boardingCount = 0;

            $scope.eloSearches = 0;
            $scope.eloOps = 0;

            $scope.jetSearches = 0;
            $scope.jetOps = 0;

            $scope.fourthSearches = undefined;
            $scope.fourthOps = undefined;
            $scope.selectedAgency = {title: null, id: null};

            $scope.agrSearches = 0;
            $scope.agrOps = 0;

            $scope.loadingOps       = false;
            $scope.loadingSearches  = false;
            $scope.loading_agencies = false;

            $scope.agencies = [];
            $scope.companies = [];

            var init = function () {

                loadCompanies();

                var from = moment().startOf('day');
                var to = moment().endOf('day');

                Dashboard.searchCount({ from: from.format('YYYY-MM-DD') }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.searchCount = data.data;
                        }
                    });

                Dashboard.boardingCount({ from: from.format('YYYY-MM-DD'), to: to.format('YYYY-MM-DD') }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.boardingCount = data.data;
                        }
                    });

                Dashboard.opCount({ from: from.format('YYYY-MM-DD') }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.opCount = data.data;
                        }
                    });

                //Elomilhas
                Dashboard.specificSearchCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: 1279 }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.eloSearches = data.data;
                        }
                    });

                Dashboard.specificOpCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: 1279 }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.eloOps = data.data;
                        }
                    });

                //JETVISA
                Dashboard.specificSearchCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: 520 }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.jetSearches = data.data;

                        }
                    });

                Dashboard.specificOpCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: 520 }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.jetOps = data.data;
                        }
                    });

                //AGR NOW
                Dashboard.specificSearchCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: 2258 }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.agrSearches = data.data;
                        }
                    });

                Dashboard.specificOpCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: 2258 }, {},
                    function success(data) {
                        if (!data.error) {
                            $scope.agrOps = data.data;
                        }
                    });

            };

            var loadCompanies = function () {
                Company.query({},
                    function success(data) {
                        $scope.companies = data.data.filter(function(i){
                            return !i.status;
                        });
                    },
                    function error(data){
                        $scope.hideCompaniesMarkup = true;
                    });
            };

            $scope.resetCounter = function () {
                $scope.openInput = false;
                $scope.fourthOps = '--';
                $scope.fourthSearches = '--';
                $scope.selectedAgency.title = undefined;
                $scope.selectedAgency.id = undefined;

            };

            $scope.onSelectAgency = function (counter, selected) {

                if (counter) {
                    $scope.selectedAgency.title = selected.title;
                    $scope.selectedAgency.id = selected.id;
                    $scope.fourthOps = '--';
                    $scope.fourthSearches = '--';

                    $scope.loadingOps      = true;
                    $scope.loadingSearches = true;

                    Dashboard.specificOpCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: selected.id }, {},
                        function success(data) {
                            $scope.fourthOps  = data.data;
                            $scope.loadingOps = false;

                        });
                    Dashboard.specificSearchCount({ date_start: moment().format('YYYY-MM-DD'), date_end: moment().format('YYYY-MM-DD'), agency_id: selected.id }, {},
                        function success(data) {
                            $scope.fourthSearches = data.data;
                            $scope.loadingSearches = false;
                        });



                } else {
                    counter.search = null;
                }
            };


            $scope.searchAgency = function (agency) {

                if (agency && agency.length) {

                    $scope.loading_agencies = true;

                    Agency.query({ search: agency, orderBy: 'title', sortedBy: 'DESC' },
                        function success(data) {
                            $scope.agencies = data.data;
                            $scope.loading_agencies = false;
                        }
                    );
                }

            };

            init();
        }]);

