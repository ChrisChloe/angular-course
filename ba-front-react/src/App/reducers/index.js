import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import login from './login_reducer';
import busca from './busca_reducer';
import order from './order_reducer';
import emission from './emission_reducer';
import refund from './refund_reducer';
import {reducer as notifications} from 'react-notification-system-redux';

const rootReducer = combineReducers({
    state: (state = {}) => state,
    form,
    login,
    busca,
    refund,
    emission,
    order,
    notifications
});

export default rootReducer;