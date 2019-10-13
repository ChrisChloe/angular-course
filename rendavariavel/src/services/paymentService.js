import { httpClient } from '../helpers'

class PaymentServices {
  static getSessionId() {
    return httpClient.get('/pagseguro/session')
  }

  static getPlans() {
    return httpClient.get('/api/plans')
  }

  static postCreditCard(data) {
    return httpClient.post('/api/orders/pagseguro', data)
  }

  static cancelPlan(order) {
    return httpClient.delete(`/api/orders/pagseguro/${order}`)
  }
}

export default PaymentServices
