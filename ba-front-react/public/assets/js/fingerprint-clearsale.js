
$('#credit').on('click', function () {

    (function (a, b, c, d, e, f, g) {
        a['CsdpObject'] = e;
        a[e] = a[e] || function () {
            (a[e].q = a[e].q || []).push(arguments)
        }, a[e].l = 1 * new Date();
        f = b.createElement(c),
            g = b.getElementsByTagName(c)[0];
        f.async = 1;
        f.src = d;
        g.parentNode.insertBefore(f, g)
    })(window, document, 'script', '//device.clearsale.com.br/p/fp.js',
        'csdp');
    csdp('app', 'e4a3e38e3d');
    csdp('outputsessionid', 'sessionClearSale');

});