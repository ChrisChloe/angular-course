import { httpClient } from '../helpers'

export class RegisterServices {
  static getAddressCep(cep) {
    return httpClient.get(`/api/address/search/${cep}`)
  }

  static createUser(data) {
    return httpClient.post('api/users', data)
  }

  static checkEmail(email) {
    return httpClient.post('api/users/verify/email', { email })
  }

  static checkCPF(cpf) {
    return httpClient.post('api/users/verify/cpf', { cpf })
  }

  static checkToken(token) {
    return httpClient.post('api/users', token)
  }

  static checkUserCei(cpf, password) {
    return httpClient.post('api/users/verify', { cpf, password })
  }

  static sendIdentification(identification) {
    return httpClient.post('api/users/files/identification', identification)
  }

  static sendAddressProof(address) {
    return httpClient.post('api/users/files/address', address)
  }
}

export default RegisterServices
