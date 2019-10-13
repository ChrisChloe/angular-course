/**
 * Dashboard Ctrl index controller
 */
angular
    .module('app.controllers')
    .controller('EmissionStatisticsCtrl', ['$scope', '$state', 'appConfig','Dashboard','DTOptionsBuilder', 'User', 'userUtils', '$location',
        function ($scope, $state, appConfig, Dashboard, DTOptionsBuilder, User, userUtils, $location) {

            $scope.orderList = function(campo, id){
                $scope.orderField = campo;
                $scope.orderDirection = !$scope.orderDirection;
                $scope.selectedField = id;
            }

            if(userUtils.isManager() || userUtils.isEmitter()){

                $scope.emissionStatisticsFilter = {
                    from: moment().startOf('month').format('DD/MM/YYYY'),
                    to: moment().endOf('month').format('DD/MM/YYYY')
                };

                $scope.emissionStatisticsCountFooter = {
                    count: 0,
                    average: 0,
                    col1: 0,
                    col2: 0,
                    col3: 0,
                    col4: 0
                };

                var getCompany = function (companies, company, not) {
                    var s = null;

                    companies.forEach(function (c, i) {
                        var rgxp = new RegExp(company, 'i');
                        if (c.title.match(rgxp)) {
                            if (not) {
                                var rgxpNot = new RegExp(not, 'i');
                                if (!rgxpNot.test(c.title)) {
                                    s = c;
                                    return false;
                                }
                            } else {
                                s = c;
                                return false;
                            }
                        }
                    });

                    return s;
                };

                $scope.hideStatistics = function (s) {
                    if (!s.tam_amount && !s.azul_amount && !s.gol_amount && !s.avianca_amount && s.average === '00:00:00') {
                        return false;
                    }
                    return true;
                };

                $scope.getTotalCountFooter = function (counts) {
                    var total = 0;

                    for (var i = 1; i <= 4; i++) {
                        total += counts['col' + i];
                    }

                    return total;
                }

                $scope.getTotalAmount = function (amounts) {
                    var total = 0;

                    Object.keys(amounts).map(function (key) {
                        total += amounts[key];
                    });

                    return total;
                }

                var init = function () {
                    $scope.loadEmissionStatistics($scope.emissionStatisticsFilter.from, $scope.emissionStatisticsFilter.to);
                };

                $scope.loadEmissionStatistics = function (from, to) {

                    var options = {};

                    if (from && to) {
                        options = {from: from, to: to};

                        options.from = moment(moment(options.from, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                        options.to = moment(moment(options.to, 'DD/MM/YYYY')).format('YYYY-MM-DD');
                    }

                    Dashboard.emissionStatistics(options, {},
                        function success(response) {
                            if (response.data) {
                                $scope.statistics = [];
                                $scope.emissionStatisticsCountFooter.average = response.extra.average;

                                $scope.emissionStatisticsCountFooter.col1 = 0;
                                $scope.emissionStatisticsCountFooter.col2 = 0;
                                $scope.emissionStatisticsCountFooter.col3 = 0;
                                $scope.emissionStatisticsCountFooter.col4 = 0;
                                $scope.emissionStatisticsCountFooter.col5 = 0;

                                response.data.forEach(function (user) {

                                    $scope.emissionStatisticsCountFooter.col1 += getCompany(user.companies, 'tam', 'Red').amount;
                                    $scope.emissionStatisticsCountFooter.col2 += getCompany(user.companies, 'azul').amount;
                                    $scope.emissionStatisticsCountFooter.col3 += getCompany(user.companies, 'gol').amount;
                                    $scope.emissionStatisticsCountFooter.col4 += getCompany(user.companies, 'avianca').amount;

                                    var statistic = {
                                        tam_amount: getCompany(user.companies, 'tam', 'Red').amount,
                                        azul_amount: getCompany(user.companies, 'azul').amount,
                                        gol_amount: getCompany(user.companies, 'gol', 'Diamante').amount,
                                        avianca_amount: getCompany(user.companies, 'avianca').amount
                                    };

                                    statistic.total      = $scope.getTotalAmount(statistic);
                                    statistic.name       = user.name;
                                    statistic.last_login = user.last_login;
                                    statistic.current_op = user.current_op;
                                    statistic.average    = user.average;

                                    $scope.statistics.push(statistic);
                                });

                                $scope.statistics = $scope.statistics.filter($scope.hideStatistics);

                                $scope.emissionStatisticsCountFooter.col5 = $scope.getTotalCountFooter($scope.emissionStatisticsCountFooter);
                            }
                        });
                }

                init();
            } else {
                $location.path("/#");
            }
        }]);

