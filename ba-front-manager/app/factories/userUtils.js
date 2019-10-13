angular
    .module('app.services')
    .service('userUtils', ['$cookies', 'User',
        function ($cookies, User) {

            var user = $cookies.getObject('auth_user');
            user = user.name ? user : user.data;

            var _getUser = function(){
                return user;
            };

            var _isEmitter = function(){
                var userEmitter = null;

                user.roles.forEach(function(role){
                    if(role.name == 'Emissor' || role.name == 'Root' || role.name == 'Administrador'){
                        userEmitter = user;
                    }
                });

                return userEmitter;
            };

            var _hasRole = function(roleName){
                var u = null;

                user.roles.forEach(function(role){
                    if(role.name == roleName){
                        u = user;
                    }
                });

                return u;
            };

            var _isEmitterManager = function(){
                var userEmitter = null;

                user.roles.forEach(function(role){
                    if(role.name == 'Coordenador Emissão' || role.name == 'Coordenador Financeiro' || role.name == 'Root' || role.name == 'Gerente'){
                        userEmitter = user;
                    }
                });

                return userEmitter;
            };


            var _isManager = function(){
                var userManager = null;

                user.roles.forEach(function(role){
                    if(role.name == 'Coordenador Emissão' || role.name == 'Coordenador Financeiro' || role.name == 'Supervisor' || role.name == 'Root'){
                        userManager = user;
                    }
                });

                return userManager;
            };

            var _isFinancial = function(){
                var userFinancial = null;

                user.roles.forEach(function(role){
                    if(role.name == 'Financeiro' || role.name == 'Root' || role.name == 'Coordenador Financeiro' || role.name == 'Coordenador Emissão'){
                        userFinancial = user;
                    }
                });

                return userFinancial;
            };

            var _isRoot = function(){
                var userRoot = null;

                user.roles.forEach(function(role){
                    if(role.name == 'Root' || role.name == 'Supervisor'){
                        userRoot = user;
                    }
                });

                return userRoot;
            };

            return {
                getUser:_getUser,
                hasRole:_hasRole,
                isManager:_isManager,
                isEmitterManager:_isEmitterManager,
                isEmitter:_isEmitter,
                isFinancial:_isFinancial,
                isRoot:_isRoot
            };
        }]);
