import { httpClient, variables } from '../helpers'

class AuthenticationService {
  static postLogin(username, password) {
    const data = {
      username,
      password,
      grant_type: variables.grantType,
      client_id: variables.clientId,
      client_secret: variables.clientSecret,
      scope: variables.scope,
    }
    return httpClient.post('/api/oauth/token', data)
  }

  static postRegister(data) {
    return httpClient.post('/api/users', data)
  }

  static getUsers() {
    return httpClient.get('/api/users')
  }
}

export default AuthenticationService
