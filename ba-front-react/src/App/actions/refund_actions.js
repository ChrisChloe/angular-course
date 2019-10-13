import {createInstance} from '../config/axios';
import {getBaseUrl} from '../utils/utils';
import {GET_ETICKETS, GET_STATUS_EMISSION} from "./types";

const axios = createInstance();

export const getEtickets = (data) => {
    const url = getBaseUrl(`/etickets?orderBy=id&page=${data.page}&search=${data.search}&sortedBy=desc`);
    const response = axios.get(url);

    return {
        type: GET_ETICKETS,
        payload: response
    }
};

export const getStatusEmission = (eticket, type) => {
    const url = getBaseUrl('/emissions/solicitationStatusAvaliable');
    const data = {
        typeRefund: (type === 'flight' ? 'go' : 'back'),
        price: eticket[type].adult_original_price,
        emission_id: eticket.id,
        flight_id: eticket.flight.flight_id,
        passenger_id: eticket.passenger.id,
        confirmation_code: eticket.e_ticket,
        created_at: eticket.created_at
    };

    const response = axios.post(url, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });

    return {
        type: GET_STATUS_EMISSION,
        payload: response
    }

};