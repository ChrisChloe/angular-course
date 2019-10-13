import {GET_OPS,SET_OPS, DOWNLOAD_PDF, SEARCH_CEP, LOGOUT} from '../actions/types'

export default (state = [], action) => {

    switch (action.type) {
        case GET_OPS:
            if (action.payload.error)
                return {...state, ops: []}
            return {...state, ops: action.payload.data.data, dataPaginate: action.payload.data.meta.pagination}
        case SET_OPS:
            return {...state, ops: action.payload}
        case DOWNLOAD_PDF:
            return {...state, pdf: action.payload}
        case SEARCH_CEP:
            return {...state, address: action.payload.data}
        case LOGOUT:
            return {};
        default:
            return state;
    }
};