import { httpClient } from '../helpers'

class ImpostRendaService {
  static getDarfs() {
    return httpClient.get('/api/darfs')
  }

  static getDarfsDownload(id) {
    return httpClient.get(`/api/darfs/${id}/download`, {
      responseType: 'blob',
    })
  }

  static getMemoryCalcDownload(id) {
    return httpClient.get(`/api/darfs/report/${id}/download`, {
      responseType: 'blob',
    })
  }

  static postAttachmentReceipt(data) {
    return httpClient.post('/api/files', data)
  }
}

export default ImpostRendaService
