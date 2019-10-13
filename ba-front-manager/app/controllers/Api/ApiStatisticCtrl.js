/**
 * Api index controller
 */
angular
    .module('app.controllers')
    .controller('ApiStatisticCtrl', ['$scope', '$state', 'appConfig', 'Api', 'Search', 'toastr',
        function ($scope, $state, appConfig, Api, Search, toastr) {

            var init = function () {
                chart();
                chartHour();
            };

            var chart = function() {
                Search.chartCount({},{},
                    function success(response){

                        var data = response.data;

                        var seriesOptions = [];
                        $.each(data.items, function (i, item) {
                            var name = data.apis[i];
                            name = name ? name : "Indefinido";

                            seriesOptions.push({
                                name: name,
                                data: item
                            });
                        });

                        Highcharts.stockChart('container-chart', {
                            title: {
                                text: 'Buscas Por API' + " (Total de " + data.total + " buscas)"
                            },
                            subtitle: {
                                text: document.ontouchstart === undefined ?
                                    'Clique e arraste na área do desenho para fazer zoom' :
                                    'Comprima o gráfico para aumentar o zoom'
                            },
                            rangeSelector: {
                                selected: 0,
                                inputDateFormat: "%e %b %Y"
                            },
                            chart: {
                                type: 'spline',
                                zoomType: 'x',
                                events: {
                                    load: function () {

                                    }
                                }
                            },
                            xAxis: {
                                ordinal: false,
                                events: {
                                    afterSetExtremes: function (e) {
                                        var sums = [], total = 0, chart = this;
                                        //console.log(chart.series[0]);
                                        for (var s in chart.series) {
                                            sums[s] = 0;
                                            for (var i in chart.series[s].data) {
                                                point = chart.series[s].data[i];
                                                if (point.x >= chart.min && point.x <= chart.max)
                                                    sums[s] += point.y;
                                            }
                                        }

                                        $('#api-sum-selected').html("");
                                        for (var sum in sums) {
                                            color = chart.series[sum].color;
                                            name = chart.series[sum].name;
                                            total += sums[sum];
                                            $('#api-sum-selected').append('<li><span style="color:' + color + '">' + name + "</span>: " + sums[sum] + '</li>');
                                        }
                                        $('#api-sum-selected').append('<li>Total: ' + total + '</li>');

                                    }
                                }
                            },
                            yAxis: [{
                                title: {
                                    text: "Qtde. de Buscas",
                                    x: 5
                                },
                                labels: {
                                    style: {"fontWeight": "bold"},
                                    x: 5
                                },
                                min: 0,
                                allowDecimals: false
                            }],
                            tooltip: {
                                headerFormat: '<span style="font-weight: bold;font-size: 13px">{point.x:%a, %d %b %y}</span><br/><br/>',
                                pointFormat: '<br/><span style="color:{series.color};font-weight: bold;">' +
                                '{series.name}</span>:<span style="font-weight: bold">{point.y:.0f} buscas</span><br/>'
                            },
                            legend: {
                                enabled: true
                            },
                            plotOptions: {
                                series: {
                                    allowPointSelect: true
                                },
                                spline: {
                                    lineWidth: 3,
                                    states: {
                                        hover: {
                                            lineWidth: 4
                                        }
                                    },
                                    marker: {
                                        enabled: false,
                                        radius: 3
                                    },
                                }
                            },
                            series: seriesOptions
                        });
                    });
            };

            var chartHour = function(){

                Search.chartHour({},{},
                    function success(response){

                        var data = response.data;

                        Highcharts.chart('container-chart-2', {
                            chart: {
                                type: 'spline'
                            },
                            title: {
                                text: 'Buscas por hora do dia',
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: [
                                    '00:00',
                                    '01:00',
                                    '02:00',
                                    '03:00',
                                    '04:00',
                                    '05:00',
                                    '06:00',
                                    '07:00',
                                    '08:00',
                                    '09:00',
                                    '10:00',
                                    '11:00',
                                    '12:00',
                                    '13:00',
                                    '14:00',
                                    '15:00',
                                    '16:00',
                                    '17:00',
                                    '18:00',
                                    '19:00',
                                    '20:00',
                                    '21:00',
                                    '22:00',
                                    '23:00'
                                ]
                            },
                            yAxis: {
                                title: {
                                    text: 'Qtd. de buscas'
                                }
                            },
                            tooltip: {
                                valueSuffix: ' buscas'
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            plotOptions: {
                                spline: {
                                    lineWidth: 3,
                                    states: {
                                        hover: {
                                            lineWidth: 4
                                        }
                                    },
                                    marker: {
                                        enabled: false,
                                        radius: 3
                                    }
                                }
                            },
                            series: data
                        });
                    });
            };

            init();
        }]);

