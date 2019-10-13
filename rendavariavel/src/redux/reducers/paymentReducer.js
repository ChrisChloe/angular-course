import {
    GET_PLANS
  } from '../types/actionTypes';
  import { paymentDefaultStates } from '../types/initialState';
  
  export default (state = paymentDefaultStates, action) => {
    switch (action.type) {
      case GET_PLANS: 
        return {...state, plans: action.payload.data}
      default:
        return state
    }
  };
  