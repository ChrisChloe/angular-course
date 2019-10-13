angular
    .module('app.filters')
    .filter('dst', function () {
        return function(value, format) {
            return moment(value).subtract(1, 'hour').format(format);
        };
    });