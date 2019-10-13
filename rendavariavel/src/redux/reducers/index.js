import { combineReducers } from 'redux'
import authentication from './authenticationReducer'
import stock from './stockReducer'
import payment from './paymentReducer'
import register from './registerReducer'

const rootReducers = combineReducers({
  authentication,
  stock,
  payment,
  register,
})

export default rootReducers
