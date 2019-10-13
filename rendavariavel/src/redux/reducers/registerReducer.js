import {
  GET_ADDRESS_CEP
} from '../types/actionTypes';
import { paymentDefaultStates } from '../types/initialState';

export default (state = paymentDefaultStates, action) => {
  switch (action.type) {
    case GET_ADDRESS_CEP: 
      return {...state, addressCep: action.payload}
    default:
      return state
  }
};
