/**
 * DirectiveClickToCall
 */
angular
    .module('app.directives')
    .directive('baAdvancedSearch', [function () {


        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'views/advanced-search-modal.html',
            controller: ['$scope', 'appConfig', 'Group', '$uibModal', 'toastr',
                function ($scope, appConfig, Group, $uibModal, toastr) {

                    //@TODO: Adaptar para outras listagens;
                    
                    $scope.groups = [];
                    $scope.ufs = appConfig.ufs;
                    $scope.status = appConfig.agency_status;
                    $scope.region = appConfig.region;
                    $scope.payment_type = appConfig.PaymentTypes;
                    $scope.filtered = false;

                    var loadModal = false;

                    $scope.openModal = function () {
                        if (!loadModal) {
                            Group.query({}, function (data) {
                                $scope.groups = data.data;
                            });
                            loadModal = true;
                        }

                    };

                    $scope.filter = function (search) {
                        $scope.filtered = hasFilters(search);

                        if(search) {
                            search.advanced_search = true;
                        }

                        $scope.$emit('filter', search);
                        $scope.$broadcast('filter', search);

                        $('#advancedSearch').modal('hide');
                    };

                    $scope.clearForm = function (search) {
                        $scope.filtered = false;

                        for(var i in search){
                            delete search[i];
                        }
                    };

                    var hasFilters = function(search){
                        if(!search) return false;

                        for(var attr in search){
                            if(search[attr] && attr != 'advanced_search'){
                                return true;
                            }
                        }
                    };

                }]
        };
    }]);




