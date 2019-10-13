import {
    LOGIN,
    GET_USER_AUTHENTICATED,
    GET_DATA_USER,
    CONTACT,
    SIGNIN,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
    RESET_PASSWORD_CONFIRM,
    ERROR401,
    CHECKS_BLOCKED,
    BLOCK_USER,
    // SET_URL,
    REGISTER,
    LOGOUT,
} from '../actions/types'

export default (state = [], action) => {

    switch (action.type) {

        case ERROR401:
            console.log('error 401 intercepted.');
            return {...state, erro401:action.payload};

        case LOGIN:
            return {...state, tokens: action.payload.data};

        case CONTACT:
            return {...state, contact: action.payload};

        case SIGNIN:
            return {...state, agency: action.payload};

        case GET_USER_AUTHENTICATED:
            try{
                return {...state, authUser: action.payload.data.data}
            }catch (e){
                return {...state, authUser: null}
            }

        case GET_DATA_USER:
            return {...state, dataUser: action.payload};

        case CHANGE_PASSWORD:
            return {...state, passChange: action.payload.data};

        case RESET_PASSWORD:
            return {...state, resetPass: action.payload.data};

        case RESET_PASSWORD_CONFIRM:
            return {...state, resetPassConfirm: action.payload.data};

        case CHECKS_BLOCKED:
            return {...state, checkBlocks: action.payload.data};

        case BLOCK_USER:
            return {...state, blockUser: action.payload.data};

        case REGISTER:
            return {...state, registered: action.payload};

        // case SET_URL:
        //     return {...state, url: action.payload};

        case LOGOUT:
            return null;

        default:
            return state;
    }
};