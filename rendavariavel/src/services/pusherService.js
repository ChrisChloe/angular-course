import Pusher from 'pusher-js'
import { httpClient } from '../helpers'

const baseURL = 'https://api-rendavariavel.mangue3.com'

class PusherService {
    static userId;

    static pusher;

    static channel;

    static connect(config) {
      this.userId = config.userId

      this.pusher = new Pusher('d40fb7f7fe5feecb5667', {
        authEndpoint: `${baseURL}/api/broadcasting/auth`,
        auth: {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${config.token}`,
          },
        },
        encrypted: true,
        cluster: 'mt1',
      })


      this.channel = this.pusher.subscribe(`private-app.user.${this.userId}`)

      this.connectChannel(`private-app.user.${this.userId}`, (data) => { console.log(data) })

      this.connectChannel('sync.finished', (data) => { console.log(data) })

      this.channel.bind('pusher:subscription_error', (data) => {
        console.log('pusher:subscription_error')
        console.log(data)
      })
    }

    static disconnect() {
      this.channel = null
    }

    static connectChannel(channelName, callback) {
      this.channel.bind(channelName, callback)
    }

    static disconectChannel(channelName, callback = () => {}) {
      this.channel.unbind(channelName, callback)
    }

    static test() {
      const s = {
        async: true,
        crossDomain: true,
        url: `https://api-rendavariavel.mangue3.com/api/pusher/test?id=${this.userId}`,
        method: 'GET',
      }

      return httpClient(s)
    }
}

export default PusherService
