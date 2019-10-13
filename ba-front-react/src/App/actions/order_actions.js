import {createInstance} from '../config/axios';
import {getBaseUrl} from '../utils/utils';
import moment from 'moment';
import _ from 'lodash';
import {
    COUPON_CALCULATE, CREATE_OP, GATEWAY_BOLETO, GATEWAY_CASH,
    GET_OP, NEW_SET_OP, NEXT_MODAL,
    NOTIFIED_OP_CREATION, OPEN_TERMS, PREV_MODAL,
    RECEIPTS_RULES,
    SEND_OP,
    SEND_PAYMENT_DATA, SET_INDEX, SET_METHOD_PAY, SET_OP, SET_PLOTS,
    UPLOAD_FILE
} from "./types";


const axios = createInstance();

export const sendCieloPaymentData = (payer, op) => {
    const url = getBaseUrl('/gateways/receipts-cielo');

    const data = {
        ...payer,
        due_date: moment().format('YYYY-MM-DD'),
        amount: op.price,
        reference: op.id
    };


    return {
        type: SEND_PAYMENT_DATA,
        payload: axios.post(url, data)
    }
};

export const sendPaymentData      = (payer, op) => {
    const url = getBaseUrl('/gateways/receipts');
    const data = {
        ...payer,
        due_date: moment().format('YYYY-MM-DD'),
        amount: op.price,
        reference: op.id
    };


    return {
        type: SEND_PAYMENT_DATA,
        payload: axios.post(url, data)
    }
};

export const couponCalculate       = (price, code) => {
    const url = getBaseUrl('/coupons/calculate');
    return {type: COUPON_CALCULATE, payload: axios.post(url, {price, code})}
};

export const uploadFile           = (id, file)  => {
    const data = new FormData();
    const url = getBaseUrl('/ops/bank-transfer/upload');


    data.append( 'id', id);
    data.append( 'file', file);

    return {
        type: UPLOAD_FILE,
        payload: axios.post(url, data,
            {'Content-Type': 'multipart/form-data'})
    }
};

export const verifyPoints         = (verifyPointsOp)  => {
    const url = getBaseUrl('/ops/verify-points');

    if(_.isEmpty(verifyPointsOp.babies))
        delete verifyPointsOp.babies;

    if(_.isEmpty(verifyPointsOp.children))
        delete verifyPointsOp.children;

    return {

        type: SEND_OP,
        payload: axios.post(url, verifyPointsOp)

    }

};

export const setReceiptsRules     = (agencyAndOpData) => {
    const url = getBaseUrl('/agencies/receipts-rules');
    return {
        type: RECEIPTS_RULES,
        payload: axios.post(url, agencyAndOpData)
    }

};

export const notified             = (notified) => ({type: NOTIFIED_OP_CREATION, payload:notified});

export const getOp                = (id)       =>{
    const url = getBaseUrl(`/ops/${id}`);
    return {type: GET_OP,         payload: axios.get(url)}
};

export const newSetOp             = (op)       => ({type: NEW_SET_OP,     payload: op});

export const setOp                = (op)       => ({type: SET_OP,         payload: op});

export const setDialogIndex       = (index)    => ({type: SET_INDEX,      payload: index});

export const setPlots             = (plots)    => ({type: SET_PLOTS,      payload: plots});

export const setMethodPay         = (method)   => ({type: SET_METHOD_PAY, payload: method});

export const openTerms            = (term)     => ({type: OPEN_TERMS,     payload: term});

export const sendOp               = (opId)     => {
    const url = getBaseUrl(`/ops/send/${opId}`);
    return {type: SEND_OP,        payload: axios.get(url)}
};

export const createOp             = (op)       => {
    const url = getBaseUrl('/ops');

    if(_.isEmpty(op.babies))
        delete op.babies;

    if(_.isEmpty(op.children))
        delete op.children;

    return {
        type: CREATE_OP,
        payload: axios.post(url, op)

    }

};

export const gatewayBoleto        = (id)       => {
    const url = getBaseUrl('/gateways/boleto');
    return {
        type: GATEWAY_BOLETO,
        payload: axios.post(url, {id: id})
    }
};

export const gatewayCash          = (id)       => {
    const url = getBaseUrl('/gateways/bank-transfer');

    return {
        type: GATEWAY_CASH,
        payload: axios.post(url, {id})
    }
};

export const prevModal            = ()         => ({type: PREV_MODAL});

export const nextModal            = ()         => ({type: NEXT_MODAL});
