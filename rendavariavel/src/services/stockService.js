import { httpClient } from '../helpers'

class StockService {
  static getStocks() {
    return httpClient.get('/api/stocks')
  }

  static getPosition() {
    return httpClient.get('/api/stocks/position')
  }

  static getAgents() {
    return httpClient.get('/api/stocks/agents')
  }

  static putAgent(agent) {
    return httpClient.put('/api/stocks/agents', agent)
  }

  static getDashboardData() {
    return httpClient.get('/api/dashboard')
  }
}

export default StockService
