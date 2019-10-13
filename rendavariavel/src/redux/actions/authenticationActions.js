import moment from 'moment'
import authenticationService from '../../services/authenticationService'
import {
  AUTHENTICATED,
  LOGOUT,
  AUTHENTICATION_ERROR,
} from '../types/actionTypes'
import PusherService from '../../services/pusherService'

const getUser = async () => {
  const { data } = await authenticationService.getUsers()

  return data.data
}

export const loginAuth = (username, password) => async (dispatch) => {
  try {
    const { data } = await authenticationService.postLogin(username, password)

    if (data) {
      window.localStorage.token = JSON.stringify(data)

      const user = await getUser()
      window.localStorage.user = JSON.stringify(user)

      PusherService.connect({ userId: user.id, token: data.access_token })
      return dispatch({ type: AUTHENTICATED })
    }
    return false
  } catch (error) {
    const { response } = error
    dispatch({ type: AUTHENTICATION_ERROR, payload: response.data })
    throw response.data
  }
}

export const logout = () => dispatch => new Promise((resolve) => {
  PusherService.disconnect()
  dispatch({
    type: LOGOUT,
  })
  delete window.localStorage.token
  delete window.localStorage.user

  resolve()
})

export const isLoggedIn = () => {
  moment.locale('pt-br')

  const token = window.localStorage.token ? JSON.parse(window.localStorage.token) : {}
  const user = window.localStorage.user || null

  if (token && token.access_token && user) {
    return true
  }

  return false
}
