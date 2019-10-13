import localforage from 'localforage';
import _ from 'lodash';
import {show} from 'react-notification-system-redux';
import {createInstance} from '../config/axios';
import {getBaseUrl, getObjectCookie, eraseCookie} from '../utils/utils';
import {
    CLEAR_BEST_PRICES,
    CLEAR_FLIGHTS,
    CLEAR_SEARCHING_DATA, CLEAR_SEARCHING_RESULTSET,
    END_SEARCHING_COMPANY,
    ERROR_SEARCHING_COMPANY, GET_AIRPORTS,
    GET_BEST_PRICES, GET_COMPANIES, GET_UUID, IS_SEARCHING,
    RESEARCH,
    SEARCH_FLIGHTS,
    SELECT_AIRPORT_DESTINATION,
    SELECT_AIRPORT_ORIGIN, SEND_NOTIFICATION, SEND_SEARCH_HASH, SEND_UUID, SET_END_SEARCHING, SET_HASH_TRACKER,
    SET_PREVENT_SEARCH,
    SET_SEARCH_TIMEOUT,
    SET_SELECTED_COMPANIES,
    SHARE_AIRPORTS,
    SHARE_REQUEST_FLIGHT_DATA,
    SORT_FLIGHTS,
    START_SEARCHING_COMPANY,
    GET_SHOW_MODAL,
    SHOW_FINANCIAL_CONFIG,
    UPDATE_SERVICE_CHARGE
} from "./types";
import Notifications from 'react-notification-system-redux';

const {NOTIFY_URL} = process.env;
const axios = createInstance();

export const selectAirport = (airport, origin) => ({
    type: origin ? SELECT_AIRPORT_ORIGIN : SELECT_AIRPORT_DESTINATION,
    payload: {airport, origin: origin === true}
});

export const findFlights = (flightForm) => {
    const url = getBaseUrl('/searches/find');
    const response = axios.post(url, flightForm);
    localforage.clear();
    return {
        type: SEARCH_FLIGHTS,
        payload: response
    }
};

export function errorSearchingInCompanyNew(company) {
    const message = `Voos indisponíveis para a cia ${company.name}.`;

    return (dispatch) => {
        dispatch(show({
            title: 'Ops!',
            message: message,
            autoDismiss: 15
        }, 'error'));
        dispatch(endSearchingInCompany(company));
    }
}

export function findFlightsWithCache(flightForm, company = {}) {

    const url = getBaseUrl('/searches/find');

    return (dispatch) => {

        dispatch(startSearchingInCompany(company));
        localforage.getItem(JSON.stringify(flightForm)).then((flightStored) => {
            if (flightStored && flightStored.data && !_.isEmpty(flightStored.data.flights)) {
                try {
                    flightStored = JSON.parse(flightStored);
                    dispatch({
                        type: SEARCH_FLIGHTS,
                        payload: flightStored
                    });
                    dispatch(endSearchingInCompany(company));
                } catch (err) {
                    dispatch(errorSearchingInCompanyNew(company));
                }
            } else {
                axios.post(url, flightForm).then((flight) => {
                    if (flight && flight.data && !_.isEmpty(flight.data.flights)) {
                        localforage.setItem(JSON.stringify(flightForm), JSON.stringify(flight)).then(() => {
                            dispatch({
                                type: SEARCH_FLIGHTS,
                                payload: flight
                            });
                            dispatch(endSearchingInCompany(company));
                        }).catch(() => {
                            dispatch({
                                type: SEARCH_FLIGHTS,
                                payload: flight
                            });
                            dispatch(endSearchingInCompany(company));
                        });
                    } else {
                        dispatch({
                            type: SEARCH_FLIGHTS,
                            payload: flight
                        });
                        dispatch(endSearchingInCompany(company));
                    }
                }).catch(() => {
                    dispatch(errorSearchingInCompanyNew(company));
                })
            }
        });
    }
}

export const selectFlight = (flight, TYPE) => ({type: TYPE, payload: flight});

export const setSearchTimeOut = (alert, timeout) => ({
    type: SET_SEARCH_TIMEOUT,
    payload: {alert: alert, timeout: timeout}
});

export const setResearch = (research) => ({type: RESEARCH, payload: research});

export const setPreventSearch = (preventSearch) => ({type: SET_PREVENT_SEARCH, payload: preventSearch});

export const shareAirports = (airports) => ({type: SHARE_AIRPORTS, payload: airports});

export const setSelectedCompanies = (companies) => ({type: SET_SELECTED_COMPANIES, payload: companies});

export const shareRequestFlightData = (formData) => ({type: SHARE_REQUEST_FLIGHT_DATA, payload: formData});

export const startSearchingInCompany = (company) => ({
    type: START_SEARCHING_COMPANY,
    payload: {...company, done: false, searching: true, error: false}
});

export const endSearchingInCompany = (company) => ({
    type: END_SEARCHING_COMPANY,
    payload: {...company, done: true, searching: false}
});

export const errorSearchingInCompany = (company) => ({
    type: ERROR_SEARCHING_COMPANY,
    payload: {...company, error: true, searching: false}
});

export const getBestPrices = (options) => {
    const url = getBaseUrl('/searches/best-prices');
    return {type: GET_BEST_PRICES, payload: axios.post(url, options)}
};

export const sortFlights = (sort) => ({type: SORT_FLIGHTS, payload: sort});

export const setSearching = (value) => ({type: IS_SEARCHING, payload: value});

export const setHashTracker = (hash) => ({type: SET_HASH_TRACKER, payload: hash});

export const sendSearchHash = (hash) => {
    const url = getBaseUrl('/searches/update-status');
    return {type: SEND_SEARCH_HASH, payload: axios.post(url, hash)}
};

export const sendUuid = (uudi) => {
    const url = getBaseUrl('/search-groups/update-status');
    return {type: SEND_UUID, payload: axios.post(url, uudi)}
};

export const getUuid = (requestData) => {
    const url = getBaseUrl('/search-groups');
    return {type: GET_UUID, payload: axios.post(url, requestData)}
};

export const sendNotification = (data) => ({type: SEND_NOTIFICATION, payload: axios.post(NOTIFY_URL, data)});

export const setEndSearching = (doneSearch) => ({type: SET_END_SEARCHING, payload: doneSearch});

export const getAirports = () => {
    const url = getBaseUrl('/home/airports');
    return {type: GET_AIRPORTS, payload: axios.get(url)}
};

export const getCompanies = () => {
    const url = getBaseUrl('/companies');
    return {type: GET_COMPANIES, payload: axios.get(url)}
};

export const getShowModal = () => {
    const url = getBaseUrl('/users/banner');
    return {type: GET_SHOW_MODAL, payload: axios.get(url)}
};

export const clearSearchingData = () => ({type: CLEAR_SEARCHING_DATA, payload: []});

export const clearSearchingResultSet = () => ({type: CLEAR_SEARCHING_RESULTSET});

export const clearSelectedFlights = () => ({type: CLEAR_FLIGHTS});

export const clearBestPrices = () => ({type: CLEAR_BEST_PRICES});

export const changeFinancialConfigModal = (status = true) => {
    return {
        type: SHOW_FINANCIAL_CONFIG,
        payload: status
    }
};

export const updateServiceCharge = (requestData) => {
    const url = getBaseUrl('/agencies/update/serviceCharge');
    return (dispatch) => {
        axios.post(url, requestData).then((response) => {
            const serviceCharge = response.data.data.service_charge;
            const serviceChargeType = response.data.data.service_charge_type;
            dispatch({type:UPDATE_SERVICE_CHARGE,payload:response.data});
            dispatch(changeFinancialConfigModal(false));
            dispatch(Notifications.show(({
                title: 'Alteração de Taxa de serviço',
                message: 'Alterada com sucesso.',
                autoDismiss: 5
            })));
            dispatch(updateUserCookie(serviceCharge,serviceChargeType));
        }).catch(err=>{
            // dispatch(Notifications.show(({
            //     title: 'Alteração de Taxa de serviço',
            //     message: 'Erro ao alterar.',
            //     autoDismiss: 5
            // }),'error'));
        });
    }
};

export const updateUserCookie = (serviceCharge ,serviceChargeType) => {
    let userData =  getObjectCookie('auth_user_data');
    let newUserData = {...userData,service_charge:serviceCharge,service_charge_type:serviceChargeType};
    eraseCookie('auth_user_data');
    document.cookie = `auth_user_data=${JSON.stringify(newUserData)};max-age=21600`;
};
