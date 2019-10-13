/**
 *
 */
angular
    .module('app.controllers')
    .controller('DashboardMarkupCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'Dashboard', 'Company', '$timeout', '$interval',
        function ($scope, $rootScope, $state, appConfig, Dashboard, Company, $timeout, $interval) {

            $scope.companies = [];
            $scope.currentDate = moment().subtract(1, 'days');

            window.chartBorderColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            };

            window.chartColors = {
                red: 'rgba(255, 99, 132, 0.6)',
                orange: 'rgba(255, 159, 64, 0.6)',
                yellow: 'rgba(255, 205, 86, 0.6)',
                green: 'rgba(75, 192, 192, 0.6)',
                blue: 'rgba(54, 162, 235, 0.6)',
                purple: 'rgba(153, 102, 255, 0.6)',
                grey: 'rgba(201, 203, 207, 0.6)',
            };

            $scope.previousDate = function(){
                $scope.currentDate = $scope.currentDate.subtract(1, 'days');
                loadCompanies($scope.companies, $scope.currentDate);
            };

            $scope.canNextDate = function(){
                var date = $scope.currentDate.clone().add(1, 'days');
                return date.isBefore(moment().endOf('day'));
            };

            $scope.nextDate = function(){
                if($scope.canNextDate()){
                    $scope.currentDate = $scope.currentDate.add(1, 'days');
                    loadCompanies($scope.companies, $scope.currentDate);
                }

            };

            var parseLabels = function (entries) {
                return entries.map(function (e) {
                    var min = e.min_miles;
                    var max = e.max_miles;

                    min = min > 0 ? (min / 1000) : '0';
                    max = max > 0 ? (max / 1000) + ' mil' : '0';

                    return min + '-' + max + ' até ' + (e.days || '*') + ' dias';
                });
            };

            var parseDatasetValues = function (entries) {
                if(!entries){
                    return [];
                }

                return entries.map(function (e) {
                    return e.amount;
                });
            };

            var init = function () {

                var companies = appConfig.companies.filter(function (c) {
                    return c.main;
                });

                for(var c in companies){
                    var company = companies[c];

                    Company.get({'id': company.id}, {},
                        function success(data) {
                            $scope.companies.push(data.data);
                            $timeout(function() {
                                initCompanyChart(data.data, $scope.currentDate);
                            }, 1000);
                        });
                }
            };

            var loadCompanies = function(companies, date){
                $rootScope.$emit("showLoadingScreen", true);

                $timeout((function(){
                    $rootScope.$emit("showLoadingScreen", false);
                }).bind(this), 1500);

                for(var c in companies){
                    initCompanyChart(companies[c], date);
                }
            };

            var initCompanyChart = function(company, date){

                Dashboard.markup({'company_id': company.id, 'type':'flight', date: date.format('YYYY-MM-DD')}, {},
                    function success(data) {
                        createChart1(company, data);
                    });

                var opData = null;
                var emissionData = null;

                Dashboard.markup({'company_id': company.id, 'type': 'op', date: date.format('YYYY-MM-DD')}, {},
                    function success(data) {
                        opData = data.data;
                    });

                Dashboard.markup({'company_id': company.id, 'type': 'emission', date: date.format('YYYY-MM-DD')}, {},
                    function success(data) {
                        emissionData = data.data;
                    });

                var interval = $interval((function() {
                    if(opData && emissionData){
                        $interval.cancel(interval);
                        createChart2(company, [opData, emissionData]);
                    }
                }).bind(this), 100);
            };

            var createChart1 = function(company, data) {

                if(company.chart1){
                    company.chart1.data.datasets.forEach(function(dataset) {
                        dataset.data = parseDatasetValues(data.data);
                    });
                    company.chart1.update();

                }else{

                    var barChartData = {
                        labels: parseLabels(data.data),
                        datasets: [
                            /*{
                                type: "line",
                                fill: false,
                                label: 'Média Mensal',
                                borderColor: chartColors.orange,
                                backgroundColor: chartColors.orange,
                                //yAxisID: "y-axis-2",
                                data: parseDatasetValues(data.data)
                            },
                            {
                                type: "line",
                                fill: false,
                                label: 'Média Semanal',
                                borderColor: chartColors.grey,
                                backgroundColor: chartColors.grey,
                                //yAxisID: "y-axis-3",
                                data: parseDatasetValues(data.data)
                            },*/
                            {
                                label: 'Qtd Voos',
                                backgroundColor: chartColors.green,
                                borderColor: chartBorderColors.green,
                                borderWidth: 1,
                                data: parseDatasetValues(data.data)
                            }
                        ]

                    };

                    var ctx = document.getElementById('chart-searches-company-'+company.id).getContext('2d');

                    var chart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            showTooltips: true,
                            showAllTooltips: true,
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Qtd buscas por Markup'
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false
                            },
                            responsive: true,
                            scales: {
                                xAxes: [{
                                    stacked: true,
                                    autoSkip: false
                                }],
                                yAxes: [{
                                    stacked: true,
                                    autoSkip: false,
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });

                    window['chart-searches-company-'+company.id] = chart;
                    company.chart1 = chart;
                }

            };

            var createChart2 = function(company, data) {

                if(company.chart2){
                    company.chart2.data.datasets.forEach(function(dataset, i) {
                        dataset.data = parseDatasetValues(data[i]);
                    });
                    company.chart2.update();
                }else{

                    var barChartData = {
                        labels: parseLabels(data[0]),
                        datasets: [
                            {
                                label: 'OPs',
                                backgroundColor: window.chartColors.green,
                                borderColor: window.chartBorderColors.green,
                                borderWidth: 1,
                                data: parseDatasetValues(data[0])
                            },
                            {
                                label: 'Emissões',
                                backgroundColor: window.chartColors.blue,
                                borderColor: window.chartBorderColors.blue,
                                borderWidth: 1,
                                data: parseDatasetValues(data[1])
                            }
                        ]

                    };

                    var ctx = document.getElementById('chart-ops-emissions-company-'+company.id).getContext('2d');

                    var chart = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            showTooltips: true,
                            showAllTooltips: true,
                            title: {
                                display: true,
                                text: 'Qtd buscas por markup | OPs/Emissões'
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false
                            },
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true,
                                        autoSkip: false
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        beginAtZero:true,
                                        autoSkip: false,
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }
                                }]
                            }
                        }
                    });

                    window['chart-ops-emissions-company-'+company.id] = chart;
                    company.chart2 = chart;
                }

            };

            init();
        }]);

