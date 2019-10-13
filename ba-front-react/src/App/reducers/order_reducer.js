import {
    SEND_OP,
    SET_INDEX,
    NEXT_MODAL,
    PREV_MODAL,
    SEND_PAYMENT_DATA,
    SET_OP, GET_OP,
    SET_PLOTS,
    GATEWAY_BOLETO,
    GATEWAY_CASH,
    NOTIFIED_OP_CREATION,
    SET_METHOD_PAY,
    VERIFY_POINTS,
    NEW_SET_OP,
    RECEIPTS_RULES,
    OPEN_TERMS,
    CREATE_OP,
    LOGOUT,
    DOWNLOAD_BILLET,
    GET_BILLETS
} from '../actions/types'

export default (state = [], action) => {

    switch (action.type) {
        case SEND_OP:
            try {
                return { ...state, op: action.payload.data.data, notified: false };
            } catch (e) {
                return { ...state, op: {}, notified: false };
            }

        case VERIFY_POINTS:
            try {
                return { ...state, opVerify: action.payload };
            } catch (e) {
                return { ...state, opVerify: {}, notified: false };
            }

        case SET_INDEX:
            return { ...state, index: action.payload };

        case NEXT_MODAL:
            return { ...state, index: ++state.index };

        case PREV_MODAL:
            return { ...state, index: --state.index };

        case SEND_PAYMENT_DATA:
            return { ...state, payment: action.payload.data };

        case SET_OP:
            return { ...state, op: action.payload };

        case GET_OP:
            if (action.payload.error)
                return { ...state, op: {} };
            return { ...state, op: action.payload.data.data };

        case SET_PLOTS:
            return { ...state, plots: action.payload };

        case GATEWAY_BOLETO:
            return { ...state, boleto: action.payload };

        case GATEWAY_CASH:
            return { ...state, cash: action.payload };

        case NOTIFIED_OP_CREATION:
            return { ...state, notified: action.payload };

        case SET_METHOD_PAY:
            return { ...state, method: action.payload };

        case NEW_SET_OP:
            return { ...state, newOp: action.payload };

        case RECEIPTS_RULES:
            state.receiptsRules = null;
            return { ...state, receiptsRules: action.payload };

        case OPEN_TERMS:
            return { ...state, terms: action.payload };

        case DOWNLOAD_BILLET:
            return { ...state, billet: action.payload };

        case GET_BILLETS:
            if (action.payload.error)
                return { ...state, billets: [] }
            return { ...state, billets: action.payload.data.data, dataPaginate: action.payload.data.meta.pagination }

        case LOGOUT:
            return {};

        default: return state;
    }

};
