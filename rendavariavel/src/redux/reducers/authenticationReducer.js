import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  LOGOUT,
} from '../types/actionTypes';
import { login } from '../types/initialState';

export default (state = login, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true }
    case UNAUTHENTICATED:
      return { ...state, isAuthenticated: false }
    case LOGOUT:
      return { ...state, isAuthenticated: false, teste: true }
    case AUTHENTICATION_ERROR:
      return { ...state, isAuthenticated: false, error: action.payload }
    default:
      return state
  }
};
