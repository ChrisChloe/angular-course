window.onhashchange = function () {

    var clearSale = document.getElementById('clearSale');

    if(document.contains(clearSale)){
        document.body.removeChild(clearSale);
    }

    var isPay = (window.location.hash.indexOf('pay') > -1);

    if (isPay) {
        const script = document.createElement("script");
        script.src = "/assets/js/fingerprint-clearsale.js";
        script.id = "clearSale";
        document.body.appendChild(script);
    }
};