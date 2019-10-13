import {GET_ETICKETS, GET_STATUS_EMISSION, LOGOUT} from '../actions/types'

export default (state = [], action) => {

    switch (action.type) {
        case GET_ETICKETS:
            if(action.payload.error)
                return {...state, etickets: []}
            return {...state, etickets: action.payload.data.data, dataPaginate: action.payload.data.meta.pagination};
        case GET_STATUS_EMISSION:
            return {...state, status: action.payload};
        case LOGOUT:
            return {};
        default:
            return state;
    }
};