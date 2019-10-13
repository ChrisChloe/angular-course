import { GET_PLANS } from '../types/actionTypes'
import PaymentServices from '../../services/paymentService'

export const getSessionId = async () => {
  const { data } = await PaymentServices.getSessionId()
  if (data === 'unavailable') return getSessionId()
  console.log('SESSION_ID', data)
  window.localStorage.sessionId = data

}

export const getPlans = () => async (dispatch) => {
  const { data } = await PaymentServices.getPlans()

  return dispatch({ type: GET_PLANS, payload: data })
}

export const postCreditCard = requestData => async () => {
  const { data } = await PaymentServices.postCreditCard(requestData)

  return data
}
