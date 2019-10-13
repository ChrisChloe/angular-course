import { formatMoney } from 'accounting'
import moment from 'moment';
import _ from 'lodash';

function validaCPF(s) {
    const c = s.substr(0, 9);
    const dv = s.substr(9, 2);
    let d1 = 0;

    for (let i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (10 - i);
    }

    if (d1 === 0) return false;

    d1 = 11 - (d1 % 11);


    if (d1 > 9) d1 = 0;

    if (dv.charAt(0) != d1) {
        return false;
    }

    d1 *= 2;

    for (let i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (11 - i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(1) != d1) {

        return false;
    }
    return true;
}

function validaCNPJ(CNPJ) {
    const a = [];
    const c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let b = 0;
    let x;

    for (let i = 0; i < 12; i++) {
        a[i] = CNPJ.charAt(i);
        b += a[i] * c[i + 1];
    }

    if ((x = b % 11) < 2) {
        a[12] = 0
    } else {
        a[12] = 11 - x
    }

    b = 0;

    for (let y = 0; y < 13; y++) {
        b += (a[y] * c[y]);
    }

    if ((x = b % 11) < 2) {
        a[13] = 0;
    } else {
        a[13] = 11 - x;
    }

    if((CNPJ.charAt(12) !== a[12]) || (CNPJ.charAt(13) !== a[13])) {
        return false;
    }

    return true;
}

export function format(number){
    return formatMoney(number, "R$", 2, ".", ",")
}

export function formatDate(data){
    return moment(data).format('DD/MM/YYYY')
}

export const mask = () => {

    $('.phone').mask("(99) 99999-9999");

    $('.cpf_cnpj').mask("99.999.999/9999-99");

    $('.cpf_mask').mask("999.999.999-99");

    $('.date').mask("00/00/0000");
};

const removeAccents = (value) => {
    return value.toLowerCase()
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .replace(/ã/g, 'a')
        .replace(/ẽ/g, 'e')
        .replace(/ĩ/g, 'i')
        .replace(/õ/g, 'o')
        .replace(/ũ/g, 'u')
        .replace(/ç/g, 'c')
        .replace(/ß/g, 's');
};
''

export function matchAirportToTerm(airport, value) {
    return (removeAccents(airport.fulltitle).toUpperCase().includes(removeAccents(value).toUpperCase())
        || removeAccents(airport.city).toUpperCase().includes(removeAccents(value).toUpperCase())
        || removeAccents(airport.country).toUpperCase().includes(removeAccents(value).toUpperCase()))

}

export function filterAirports(value, cb, airports) {

    const filteredAirports = _(airports)
        .filter(airport => matchAirportToTerm(airport, value))
            .map(airport => (/Todos Aeroportos/.test(airport.fulltitle))?{...airport, priority:1}:airport)
            .map(airport => (/Rio de Janeiro - Todos Aeroportos/.test(airport.fulltitle))?{...airport, priority:0}:airport)
            // .sortBy(airport => airport.priority)
            .orderBy(['search_count'], ['desc'])
            .value();


    return setTimeout(cb, 0, value ? filteredAirports : airports)

}

export const getObjectCookie = cname => {
    const cookie = getCookie(cname);
    const validator = ((cookie !== 'null') && (cookie !== 'undefined'));
    return (validator && cookie) ? JSON.parse(cookie): undefined;
};

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


export const getUrlParams = () => {
    const url = window.location.hash.substr(1);
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = decodeURIComponent(hash[1]);
    }
    delete myJson["/"];
    return myJson;
}

export const isValidCpf = cpf_cnpj => {

    const value = (cpf_cnpj).replace(/\D/g, '');
    const tam = (value).length;

    if (!(tam === 11 || tam === 14)) {
        return false;
    }

    // se for CPF
    if (tam === 11) {
        if (!validaCPF(value)) {
            return false;
        }
        return true;
    }

    // se for CNPJ
    if (tam === 14) {
        // if (!validaCNPJ(value)) {
        //     return false;
        // }
        return true;
    }

};

export const validParamsSearch = (obj) => {
    const params = Object.keys(obj).map((k) => k );

    let array = ['type_trip', 'adults', 'children', 'babies', 'baggage_type', 'date_starting', 'date_back', 'destination_id', 'origin_id'];
    for (let i = 0; i < array.length; i++) {
        if (params.indexOf(array[i]) === -1) {
            return false;
        }
    }

    return true;
};

export const getLocation = () => {

    const geolocation = navigator.geolocation;

    return new Promise((resolve) => {

        if (!geolocation) return;

        geolocation.getCurrentPosition((position) => {
            resolve(position);
        });

    });

};

export const scrollToTop = () => {
    window.scroll(0, 0);
};

export const formatLowerCase = (value) => {

    let str = value;

    if (str) {
       str = str.toLowerCase();
    }

    return str;
};

export const getBaseUrl = (path, login = false) => {
    const user_url = getObjectCookie('user_url');
    const {API_URL} = process.env;

    return login ? `${API_URL}${path}` : path;
};

export const eraseCookie = (...name) => {

    name.forEach(e => {
        document.cookie = e + '=; Max-Age=0'
    })

};