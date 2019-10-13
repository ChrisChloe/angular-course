window.onbeforeunload = function (evt) {

    var message = 'Tem certeza que deseja sair?';
    var isPayment = (window.location.hash.indexOf('pay') > -1);

    if (typeof evt == 'undefined') {
        evt = window.event;
    }
    if (evt && isPayment) {
        evt.returnValue = message;
    }
};

$(document).ready(function () {
    var isLogin = (window.location.hash.indexOf('login') > -1);
    if (isLogin) {
        $('body').attr('oncontextmenu', 'return false');
    }
    addEventListener("keydown", function (e) {
        if (isLogin) {
            if (e.ctrlKey && e.shiftKey && e.keyCode == '73' || e.keyCode == '123') {
                e.preventDefault()
            }
        }

    });

});

$(window).on('hashchange', function(){
    var valid = (window.location.hash.indexOf('pay') == -1);
    if (valid) {
        $('body').attr('oncontextmenu', '');
    }
    addEventListener("keydown", function () {
        return false;
    });
});