//Fix datepicker modal
$('body').on('DOMNodeInserted', 'div.datepicker.datepicker-dropdown', function () {
    var interval = setInterval(function(){
        $('.datepicker.datepicker-dropdown').css('z-index', 9999);
        setTimeout(function(){
            clearInterval(interval);
        }, 2000);
    }, 50);
});