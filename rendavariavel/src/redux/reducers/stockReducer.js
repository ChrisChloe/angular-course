import {
  GET_STOCKS, GET_POSITION, GET_DASHBOARD_DATA
} from '../types/actionTypes';
import { stockDefaultStates } from '../types/initialState';

export default (state = stockDefaultStates, action) => {
  switch (action.type) {
    case GET_STOCKS: 
      return {...state, stocks: action.payload.data}
    case GET_POSITION:
      return {...state, stockPosition: action.payload.data}
    case GET_DASHBOARD_DATA: 
      return {...state, stockDashboard: action.payload.data}
    default:
      return state
  }
};
