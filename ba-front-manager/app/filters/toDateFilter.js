/**
 *
 */
angular
    .module('app.filters')
    .filter('toDate', function () {

        return function (date, from, to) {

            if (typeof date == 'string') {

                var aux = date.split(/[- :]/);

                if (date.match(/^\d{4,4}-\d{2,2}-\d{2,2} \d{2,2}:\d{2,2}:\d{2,2}$/g)) { //0000-00-00 00:00:00
                    return new Date(aux[0], aux[1] - 1, aux[2], aux[3], aux[4], aux[5]);

                } else if (date.match(/^\d{4,4}-\d{2,2}-\d{2,2}$/g)) { //0000-00-00
                    return new Date(aux[0], aux[1] - 1, aux[2]);

                } else if (date.match(/^\d{2,2}:\d{2,2}:\d{2,2}$/g)) { //00:00:00
                    var objDate = new Date();

                    objDate.setHours(parseInt(aux[0]));
                    objDate.setMinutes(parseInt(aux[1]));
                    objDate.setSeconds(parseInt(aux[2]));

                    return objDate;
                }

                return null;
            }

            return date;
        };
    });