/**
 *
 */
angular
	.module('app.controllers')
	.controller('SidebarCtrl', ['$scope', '$rootScope', '$cookies', 'userUtils', '$uibModal',
		function ($scope, $rootScope, $cookies, userUtils, $uibModal) {
			$scope.user = $cookies.getObject('auth_user');
			$scope.user = $scope.user.data ? $scope.user.data : $scope.user;

			$scope.isExecutive = $rootScope.isExecutive();


			$scope.canShowToUser = function (menu) {
				var canShow = false;

				if ($scope.user.roles) {
					$scope.user.roles.forEach(function (role) {
						if (role.name.toLowerCase() == 'root' || (role.name.toLowerCase() == 'financeiro' ||
							(role.name.toLowerCase() == 'coordenador financeiro') && menu == 'financial')) {
							canShow = true;
							return false;
						}
					});
				}
				return canShow;
			};


			$scope.auth = (userUtils.isEmitter() || userUtils.isManager() || userUtils.isFinancial()) ? $scope.emissionUser = true : $scope.emissionUser = false;

			/**Collapse vertical menu**/
			$scope.showSubMenu = function (id) {
				if ($scope.isCollapse != id) {
					$scope.isCollapse = id;
				}
				else {
					$scope.isCollapse = null;
				}
			};

			$scope.sendEmail = function () {

				var modalInstance = $uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: 'views/email-message/send.html',
					controller: 'EmailMessageSendCtrl',
					size: 'lg',
				});

				modalInstance.result.then(function () {
					load();
				});
			};

			$scope.openHelpDesk = function(){
                var modalInstance = $uibModal.open({
                    animation:   $scope.animationsEnabled,
                    templateUrl: 'views/dashboard/helpdesk.html',
                    controller:  'HelpDeskCtrl',
                    size:        'lg'
                });

                modalInstance.result.then(function () {
                    load();
                });

            };

		}]);

