angular
    .module('app.filters')
    .filter('statusMapper', function () {
        return function (value) {
            switch (value) {
                case 0:
                    return 'Inativa';
                case 1:
                    return 'Ativa';
                case 2:
                    return 'Prospecção';
                case 3:
                    return 'Desativada';
                case 4:
                    return 'Cadastur';
            }
        };
    });