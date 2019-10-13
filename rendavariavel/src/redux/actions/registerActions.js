import { GET_ADDRESS_CEP } from '../types/actionTypes'

import RegisterServices from '../../services/registerService'

export const getAddressCep = cep => async (dispatch) => {
  const { data } = await RegisterServices.getAddressCep(cep)

  return dispatch({ type: GET_ADDRESS_CEP, payload: data })
}

export const createUser = user => async () => {
  const { data } = await RegisterServices.createUser(user)

  return data
}
