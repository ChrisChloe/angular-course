/**
 * Copy with one click
 */
angular
    .module('app.directives')
    .directive('baClipboard', ['toastr',
        function (toastr) {

            return {
                restrict: 'AC',
                scope: {},
                link: function (scope, element, attrs) {

                    new Clipboard('.ba-clipboard');

                    element.on('click', function (event) {
                        element.attr('data-clipboard-text', element.text());
                        element.attr('title', 'Clique para copiar!');

                        toastr.success('Copiado!');
                    });
                }
            };
    }]);
