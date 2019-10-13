import { getCookie, getObjectCookie } from '../utils/utils';
import axios from 'axios';
import 'babel-polyfill';

const {API_URL} = process.env;
const {NOTIFY_URL} = process.env;

export function create(){
    const ax = axios.create({
        timeout: 120000
    });
    return ax;
}

export function createInstance(){

    const user_url = getObjectCookie('user_url');
    // baseURL: user_url ? user_url : `${API_URL}/api`,
    const ax = axios.create({
        baseURL: `${API_URL}/api`,
        timeout: 120000
    });

    ax.interceptors.request.use(config => {

        const jsonString = getCookie("auth_token");

        if( jsonString ){

            const tokens = JSON.parse(jsonString) || '';

            if (config.url !== NOTIFY_URL) { config.headers = { Authorization: `Bearer ${tokens.token.access_token}`};}

        }

        return config;

    }, error => {
        return Promise.reject(error);
    });

    ax.interceptors.response.use(response => {
        return response;
    }, error =>  {
        return Promise.reject(error);
    });

    return ax;
}

