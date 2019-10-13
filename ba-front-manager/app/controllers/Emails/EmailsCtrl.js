/**
 * Email index controller
 */
angular
    .module('app.controllers')
    .controller('EmailsCtrl', ['$scope', '$rootScope', '$state', 'appConfig', 'Email', 'toastr',
        function ($scope, $rootScope, $state, appConfig, Email, toastr) {

            $scope.filterCriteria = appConfig.filterCriteria();
            $scope.resource       = Email;

            $scope.email  = new Email();
            $scope.emails = [];


            var init = function () {

            };

            //Email Add
            $scope.save = function (email) {
                email.$save(
                    function success(data) {
                        if (!data.error) {
                            $scope.emails.push(data.data);
                            $scope.email = new Email();
                            toastr.success("Salvo!");
                        }
                    }
                );
            };

            $scope.read = function (email) {
                //Show loading
                $rootScope.$emit("showLoadingScreen", true);

                Email.read_mail({id: email.id}, email,
                    function success(data) {
                        toastr.success("favor aguarde esse carregamento pode demorar!");
                        //Hide loading
                        $rootScope.$emit("showLoadingScreen", false);
                        if (!data.error){
                             toastr.success(data.data);
                        }
                    });
            };

            init();
        }]);

