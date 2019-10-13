// Intercepting HTTP calls and flash validation erros
angular
    .module("app.services")
    .factory('flashError', ['$q', '$injector', '$timeout', '$rootScope',
        function ($q, $injector, $timeout, $rootScope) {
            return {
                // On response failture
                responseError: function (rejection) {
                    var toastr = $injector.get('toastr');

                    $rootScope.$emit("showLoadingScreen", false);

                    if(rejection.data && rejection.data.error && rejection.data.message && rejection.status !== 403){

                        if(typeof rejection.data.message == 'string'){

                            toastr.error(rejection.data.message);
                        }else if(typeof rejection.data.message == 'object'){
                            var show = function(message){
                                toastr.error(message);
                            };

                            for(var field in rejection.data.message){
                                rejection.data.message[field].forEach(show);
                            }
                        }
                    }else{
                        if(rejection.status == 404){
                            toastr.error("Recurso não existe!");
                        }else if((rejection.status == 400 || rejection.status == 401) && rejection.data && rejection.data.error == 'invalid_request' || rejection.status === 403) {
                            //@todo:The refresh token is invalid
                        }else if(rejection.status == 401 && rejection.data && rejection.data.error == 'invalid_credentials') {
                            toastr.error("Login e/ou senha incorretos!");
                        }else{
                            toastr.error("Ocorreu um erro inesperado!");
                        }
                    }
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
    }]);
