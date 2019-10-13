/**
 * ConciliationShow index controller
 */
angular
    .module('app.controllers')
    .controller('ConciliationShowCtrl', ['$scope', '$state', 'appConfig', 'Card', 'toastr', 'Upload', 'Conciliation',
        function ($scope, $state, appConfig, Card, toastr, Upload, Conciliation) {

            var init = function () {

                if ($state.params.responseData) {
                    $scope.responseData = JSON.parse($state.params.responseData);
                    $scope.responseData.forEach(function (data){
                       data.date.date = moment(data.date.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
                    });
                } else {
                    $state.go('app.conciliation');
                }

             }
            init();

        }]);

