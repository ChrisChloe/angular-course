/**
 * BankAccountMovement controller
 */
angular
    .module('app.controllers')
    .controller('BankAccountMovementCtrl', ['$scope', '$state', '$rootScope', 'appConfig', '$filter', 'BankAccount', 'toastr', '$location', 'userUtils',
        function ($scope, $state, $rootScope, appConfig, $filter, BankAccount, toastr, $location, userUtils) {

            $scope.bankId = $state.params.id;
            $scope.resource = BankAccount;
            $scope.filterCriteria = appConfig.filterCriteria();

            $scope.movements = [];
            $scope.highestAmounts = [];

            $scope.filter = {
                start_date: null,
                end_date: null
            }
            $scope.reverse = true;

            $scope.sortBy = function () {
                $scope.reverse = !$scope.reverse;
                $scope.propertyName = propertyName;
                $scope.movements = orderBy($scope.movements.statements, 'created_at', $scope.reverse);
            };

            $scope.limitCorrection = function () {
                if (moment($scope.filter.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD') > moment($scope.filter.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD')) {
                    $scope.filter.end_date = $scope.filter.start_date;
                }

            }

            $scope.order = function () {

                $scope.dates = [];
                var allDates = $scope.movements.statements.map(function (statement) {
                    return moment(statement.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                });

                allDates.forEach(function (date) {
                    allDates.forEach(function (secondDate) {
                        if (date == secondDate) {
                            if (!$scope.dates.includes(date)) {

                                $scope.dates.push(date);
                            }
                        }
                    });
                });

                var newStatements = $scope.movements.statements;
                newStatements.forEach(function (statement) {
                    statement.created_at_formated = moment(statement.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                });

                $scope.daysIndex = [];
                $scope.highestAmounts = [];
                var increment = 0;

                $scope.dates.forEach(function (date) {

                    newStatements.forEach(function (statement) {

                        if ($scope.highestAmounts[increment] == undefined) {

                            if ($scope.daysIndex[increment] == undefined) {
                                $scope.daysIndex[increment] = [];
                            }

                            $scope.highestAmounts[increment] = { created_at: date, balance: 0 };

                        } else if ($scope.highestAmounts[increment].balance < statement.balance && $scope.highestAmounts[increment].created_at === statement.created_at_formated) {
                            $scope.highestAmounts[increment] = { created_at: date, balance: statement.balance };
                        }

                        if ($scope.highestAmounts[increment].created_at === statement.created_at_formated) {
                            $scope.daysIndex[increment].push({ type: statement.statement_type.title, amount: statement.amount, created_at: statement.created_at, observation: statement.observation });

                        }
                    });
                    increment += 1;

                });


            }




            var init = function () {
                $scope.filter.start_date = moment().subtract('days', 1).format('DD/MM/YYYY');
                $scope.filter.end_date = moment().subtract('days', 1).format('DD/MM/YYYY');

                $scope.filteredStartDate = $scope.filter.start_date;
                $scope.filteredEndDate = $scope.filter.end_date;


                BankAccount.get({}, {
                    bank_id: $scope.bankId,
                    resource: 'api.bank.statement',
                    start_date: moment().subtract('days', 1).format('YYYY-MM-DD'),
                    end_date: moment().subtract('days', 1).format('YYYY-MM-DD')
                },
                    function success(data) {
                        $scope.movements = data.data;

                        $scope.order();

                    });


            };

            $scope.dateFilter = function () {

                var start_date = moment($scope.filter.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
                var end_date = moment($scope.filter.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD');


                $rootScope.$emit("showLoadingScreen", true);
                BankAccount.get({}, {
                    bank_id: $scope.bankId,
                    resource: 'api.bank.statement',
                    start_date: start_date,
                    end_date: end_date
                },
                    function success(data) {
                        $rootScope.$emit("showLoadingScreen", false);
                        $scope.movements = data.data;

                        $scope.filteredStartDate = $scope.filter.start_date;
                        $scope.filteredEndDate = $scope.filter.end_date;

                        $scope.order();

                    });

            }





            init();

        }]);
