import axios from 'axios'
import store from '../redux/store'
import { LOGOUT } from '../redux/types/actionTypes'

const storeInstance = store()

const baseURL = 'https://api-rendavariavel.mangue3.com'

const axiosInstace = axios.create({
  baseURL,
})

axiosInstace.interceptors.request.use(async (config) => {
  const token = window.localStorage.token ? JSON.parse(window.localStorage.token) : {}

  if (token && !!token.token_type && !!token.access_token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${token.token_type} ${token.access_token}`
  }

  return config
}, error => Promise.reject(error))

axiosInstace.interceptors.response.use(
  async response => response,
  (error) => {
    const errorResponse = error.response
    if (errorResponse.status === 401) {
      storeInstance.dispatch({ type: LOGOUT })
      delete window.localStorage.token
      delete window.localStorage.user
      // Tem que validar se a url é a de login. Fazer um regex para verificar isso.
      // window.location.reload()
    }

    return Promise.reject(error)
  },

)

const httpClient = axiosInstace

export default httpClient
