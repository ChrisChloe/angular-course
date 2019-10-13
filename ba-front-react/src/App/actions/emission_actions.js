import {createInstance, create} from '../config/axios';
import {getBaseUrl, getObjectCookie} from '../utils/utils';
import {DOWNLOAD_BILLET, DOWNLOAD_PDF, GET_BILLETS, GET_OPS, SEARCH_CEP, SET_OPS} from "./types";


const ax = create();
const axios = createInstance();

export const getOps = (data) => {
    const url = getBaseUrl(`/ops?page=${data.page}&orderBy=id&sortedBy=desc`);
    const response = axios.get(url);

    return {
        type: GET_OPS,
        payload: response
    }
};

export const setOps      = (ops)  => ({type: SET_OPS, payload: ops});

export const DownloadPDF = (id)   => {
    const url = getBaseUrl(`/ops/downloadPdf/${id}`);
    const response = axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
        transformResponse: (data) => {
        return {
            data: data,
        }
    }});

    return {
        type: DOWNLOAD_PDF,
        payload: response
    }
};

export const searchCep   = (data) => {
    const cep = data.replace(/\D/g, '');

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const response = ax.get(url);

    return {
        type: SEARCH_CEP,
        payload: response
    }
};


export function downloadBillets(id) {

    const url = getBaseUrl(`/invoice/downloadPdf?reference=${id}`);
    const response = axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer',
        transformResponse: (data) => {
        return {
            data: data,
        }
    }});

    return {
        type: DOWNLOAD_BILLET,
        payload: response
    }
}


export const getBillets = (data) => {
    const user = getObjectCookie('auth_user_data');
    
    const url = getBaseUrl(`/invoices?page=${data.page}&orderBy=id&sortedBy=desc&agency=${user.agency_id}&status=${5}`);

    const response = axios.get(url);

    return {
        type: GET_BILLETS,
        payload: response
    }
};