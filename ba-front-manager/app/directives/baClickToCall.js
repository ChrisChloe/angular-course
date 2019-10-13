/**
 * DirectiveClickToCall
 */
angular
  .module('app.directives')
  .directive('baClickToCall', [function () {


    return {
      restrict: 'EA',
      transclude: true,
      template: '<a title="Clique para Telefonar" class="btn btn-success btn-xs" ng-click="call()"><span ng-transclude></span>&thinsp;<i class="fa fa-phone"></i></a>',
      scope: {
      },
      controller: ['$scope', '$rootScope', 'Call', '$element', '$cookies', '$uibModal', 'toastr',
        function ($scope, $rootScope, Call, $element, $cookies, $uibModal, toastr) {



          $scope.call = function () {
            var user = $cookies.getObject('auth_user').data;
            var phone = $element.context.innerText;

            if (!user.branch) {

              var modalInstance = $uibModal.open({
                templateUrl: 'views/clickToCallModal.html',
                size: 'md',
                scope: $scope,
                controller: 'ClickToCallModalCtrl',
                resolve: {
                  rootScope: $scope,
                }
              });

            } else {

              $rootScope.$emit("showDialingScreen", true);
              Call.call({ phone: phone, branch: user.branch },
                function success(res) {
                  if(!res.error){
                    toastr.success(res.message);
                  }
                  $rootScope.$emit("showDialingScreen", 'done');

                });

            }

          };


        }],



    };




  }]);




