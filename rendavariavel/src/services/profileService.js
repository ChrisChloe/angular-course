import { httpClient } from '../helpers'

class ProfileServices {
  static updateUser(data) {
    return httpClient.put('/api/users', data)
  }

  static getOrders() {
    return httpClient.get('/api/users/order')
  }
}

export default ProfileServices
