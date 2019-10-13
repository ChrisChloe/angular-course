angular
    .module('app.services')
    .service('cepUtils', ['$injector',
        function ($injector) {

            var toastr = $injector.get('toastr');

            var validAddressObject = function(address) {
                return address;
            };

            var validCep = function (address) {

                var result = false;
                var regexCep = /^\d{8,8}$/;

                if (validAddressObject(address)) {
                    if (address.cep) {
                        result = regexCep.test(address.cep);
                    }
                }

                if (!result)
                {
                    toastr.info('Digite um CEP válido');
                }

                return result;
            };

            return {

                validCep:validCep

            };

        }]);
