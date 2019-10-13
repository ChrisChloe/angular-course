import { createInstance } from '../config/axios';
import { getCookie, getBaseUrl, getObjectCookie } from '../utils/utils';
import moment from 'moment';
import _ from 'lodash';
import packageJson from '../../../package.json';
import {
    BLOCK_USER,
    CHANGE_PASSWORD, CHECKS_BLOCKED,
    CONTACT, CREATE_LOGIN_DATA, ERROR401, GET_DATA_USER,
    GET_USER_AUTHENTICATED,
    LOGIN, LOGOUT, REGISTER,
    RESET_PASSWORD,
    RESET_PASSWORD_CONFIRM,
    SIGNIN
} from "./types";

const {API_URL} = process.env;
const axios = createInstance();

export const login = ( data ) => {
    const url = getBaseUrl(`/oauth/token`, true);
    const credentials = (process.env.NODE_ENV === 'production')
        ? {client_id: '16', client_secret: 'usNpVPm8qKJh4mnH5deBwQrZ5HtnVPbNyHkVktcr'} // production
        : {client_id: '15', client_secret: '9kaIVxGicvsbiQl7YZ34rXex9fGocGH3ASrdfuRv'}; // iago?
    // const credentials = {client_id: '2', client_secret: '0ofifAZMiNshekPnOqw5FYdQzA3tqwLfx5mCSEln'}; // eva
    // const credentials = {client_id: '17', client_secret: 'cbKFwsVBgkEDBkQVAOQw7dTTcgwYiCuB3lYCwuVH'}; //danyllo


    const post = {
            ...credentials,
            grant_type:'password',
            username:data.username,
            password:data.password,
        };

    const response = axios.post(url, post);

    return {
        type:LOGIN,
        payload: response
    }
};

export const changePassword = ( data ) => {
    const url = getBaseUrl(`/users/${data.userId}`);
    const response = axios.put(url, data);

    return {
        type: CHANGE_PASSWORD,
        payload: response
    }
};

export const resetPassword = ( data ) => {
    const url = getBaseUrl(`/password/email`);
    const response = axios.post(url, data);

    return {
        type: RESET_PASSWORD,
        payload: response
    }
};

export const resetPasswordConfirm = ( data ) => {
    const url = getBaseUrl('/password/reset');
    const response = axios.post(url, data);

    return {
        type: RESET_PASSWORD_CONFIRM,
        payload: response
    }
};

export const contact = ( contact ) => {
    const url = getBaseUrl('/home/contact');
    const response = axios.post(url, contact);

    return {
        type:CONTACT,
        payload: response
    }
};

export const signIn = (data) => {
    const url = getBaseUrl('/home/agency');
    const response = axios.post(url, data);

    return {
        type:SIGNIN,
        payload: response
    }

};

export const getAuthenticatedUser = (tokens, position) => {
    const url = getBaseUrl('/user');
    const response = axios.post(url, position, {
        headers: {'Authorization': `Bearer ${tokens.access_token}`}
      });

    return {
        type:GET_USER_AUTHENTICATED,
        payload: response
    }

};

export const createUserLoginData = (token, user) => {
    
    let objToken;
    try{
        objToken = JSON.parse(token);
    }catch(e){}

    const expires = (_.isObject(objToken)) ? objToken.token.expires_in : 21600;
    const user_url = JSON.stringify({"url": JSON.parse(user).backend_url});

    document.cookie = `auth_token=${token};max-age=${expires}`;
    document.cookie = `auth_user_data=${user};max-age=${expires}`;
    document.cookie = `user_url=${user_url};max-age=${expires}`;

    return {
        type:CREATE_LOGIN_DATA,
        payload: true
    }

};

export const getDataUser = () => {

    const jsonData = getObjectCookie('auth_user_data');

     if(_.isEmpty(jsonData)){

         eraseCookie("auth_token","auth_user_data");

         return {
             type:LOGOUT,
             payload: true
         }

     }
    try{

         if(!jsonData.id) throw jsonData;


        const information = jsonData.information || {};
        const name = jsonData.name || {};
        const email = jsonData.email || {};
        const cpf_cnpj = information.cpf_cnpj || {};
        const phone = information.phone || {};
        const birthday = information.birthday || '';
        const userId = jsonData.id || {};
        const agency_id = jsonData.agency_id || '';
        const service_charge = jsonData.service_charge || '';
        const service_charge_type = jsonData.service_charge_type || '';
        const json = {name, email, cpf_cnpj, phone, agency_id, birthday:moment(birthday).format('L'), userId, service_charge, service_charge_type};

        return {
            type:GET_DATA_USER,
            payload: json
        }

    }catch(e){
        console.log('error:', e);
        return {
            type:GET_DATA_USER,
            payload: null
        }
    }
};

export function isLoggedIn() {

    moment.locale('pt-br');

    const tokenString = getCookie("auth_token") || '{}';
    const tokens = JSON.parse(tokenString);

    if(tokens && tokens.token && tokens.token.access_token){

        const timeExpire = moment(parseInt(tokens.timeLogin)).add(parseInt(tokens.token.expires_in),'seconds');
        const isTokenExpired = timeExpire.isBefore(moment.now());

        return tokens.token.access_token != null && !isTokenExpired;

    }

    return false;

}

export const logout = () => {

    eraseCookie("auth_token", "auth_user_data", "user_url");

    return {
        type:LOGOUT,
        payload: true
    }
};

export const eraseCookie = (...name) => {

    name.forEach(e => {
        document.cookie = e + '=; Max-Age=0'
    })

};

export const error401 = () => {

    return {
        type:ERROR401,
        payload: true
    }
};

export const checksBlocked = (username) => {
    const url = getBaseUrl(`${API_URL}/api/users/checksBlocked`);
    const version = packageJson.version;
    const data = { "username": username, "version-front-busca": version };
    const response = axios.post(url, data);

    return {
        type: CHECKS_BLOCKED,
        payload: response
    }
};

export const blockUser = (username) => {
    const url = getBaseUrl(`${API_URL}/api/users/block`);
    const data = {username: username};

    return {
        type: BLOCK_USER,
        payload: axios.post(url, data)
    }
};

export const register = (registered) => ({type: REGISTER, payload: registered});

// export const setUrl = (url) => ({type: SET_URL, payload: url});