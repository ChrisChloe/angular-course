import { httpClient } from '../helpers'

class CoreServices {
  static getAddress(cep) {
    return httpClient.get(`/api/address/search/${cep}`)
  }

  static postRecoverPassword(email) {
    return httpClient.post('/api/password/email', { email })
  }

  static postResetPassword(data) {
    return httpClient.post('/api/password/reset', data)
  }
}

export default CoreServices
