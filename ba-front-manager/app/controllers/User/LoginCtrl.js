/**
 *
 */
angular
    .module('app.controllers')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$location', 'toastr', '$cookies', 'User', 'OAuth','appConfig',
        function ($scope, $rootScope, $state, $location, toastr, $cookies, User, OAuth,appConfig) {

            $scope.user = {
                username: '',
                password: ''
            };
            if (!$scope.contAudit) {
                $scope.contAudit = 0;
            }
            $scope.resource = User;
            $scope.button = false;
            $scope.buttonLogin = 'Logar';

            var controleButtonAtivar = function () {
                $scope.button = false;
                $scope.buttonLogin = 'Logar';
            };

            var onPermissionGranted = function () {
                var myNotification = new Notify('Atenção', {
                    body: 'Permissão Concedida'
                });
                myNotification.show();
                console.log('Permission has been granted by the user');
            };

            var onPermissionDenied = function () {
                toastr.warning('É preciso permitir notificação para se logar');
                console.warn('Permission has been denied by the user');
            };

            var verifyAttempts = function () {
                $scope.contAudit++;
                if ($scope.contAudit === 4) {
                    // toastr.warning('Contate o administrador do Sistema!'); //disabilitando notificações de bloqueio de usuário
                    // toastr.warning('Atenção você foi bloqueado!');
                    User.block({username: $scope.user.username});
                    $scope.contAudit = 0;
                } else {
                    loginExecute();
                }


            };

            var loginExecute = function () {
                if ($scope.form.$valid) {
                    $scope.button = true;
                    $scope.buttonLogin = 'Processando...';

                    OAuth
                        .getAccessToken($scope.user)
                        .then(function success() {
                            User.authenticated({}, {},
                                function (response) {

                                    //$cookies.putObject('auth_user', response);

                                    var user = {
                                        "data": {
                                            "id": response.data.id,
                                            "name": response.data.name,
                                            "email": response.data.email,
                                            "gender": response.data.gender,
                                            "agency_id": response.data.agency_id,
                                            "is_manager": response.data.is_manager,
                                            "agency": null,
                                            "roles": response.data.roles,
                                            "emission_average": response.data.emission_average,
                                            "status": response.data.status,
                                            "branch": response.data.branch,
                                            "last_login": response.data.last_login,
                                            "last_search": response.data.last_search,
                                            "last_emission": response.data.last_emission,
                                            "created_at": response.data.created_at
                                        }
                                    };

                                    if(response.data.agency){
                                        user.agency = {
                                            "id": response.data.agency.id,
                                            "title": response.data.agency.title,
                                            "cpf_cnpj": response.data.agency.cpf_cnpj,
                                            "email": response.data.agency.email,
                                            "status": response.data.agency.status,
                                            "created_at": response.data.agency.created_at
                                        };
                                    }

                                    $cookies.putObject('auth_user', user);

                                    if ($location.search().redirect) {
                                        $location.path($location.search().redirect);
                                        $location.search('redirect', null);
                                    } else {
                                        $state.transitionTo("app.home");
                                    }
                                });
                            controleButtonAtivar();
                        });
                }

                $rootScope.$on("oauth:error", function (event, data) {
                    if (!data.rejection || 401 === data.rejection.status) {
                        toastr.error('Email ou senha incorretos!', 'Erro!', {"preventDuplicates": true});
                        controleButtonAtivar();
                    }
                });
            };
            //Autenticando
            $scope.login = function () {
                if (Notify.needsPermission && Notify.isSupported()) {
                    Notify.requestPermission(onPermissionGranted, onPermissionDenied);
                }
                User.checksBlocked({user: $scope.user, version_front_manager:appConfig.versionNumber},
                    function success(data) {
                        if(!data.error) {
                            if (data.status == 'inativa') {
                                toastr.warning('Atenção sua conta esta Inativa!');
                            } else if (data.status == 'inexistente') {
                                toastr.warning('Atenção sua conta não existe!');
                            } else {
                                verifyAttempts(); //Bloqueio de usuário por tentativas de senha incorreta.
                            }
                        }else{
                            toastr.warning('Atenção essa versão esta desatualizada favor limpar cache');
                        }
                    });

            };


        }]);

 