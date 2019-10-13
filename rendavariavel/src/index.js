
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/browser'
import Routes from './routes'
import store from './redux/store'
import { AUTHENTICATED } from './redux/types/actionTypes'
import * as serviceWorker from './serviceWorker'
import PusherService from './services/pusherService'
import { isLoggedIn } from './redux/actions/authenticationActions'

const storeInstance = store()

Sentry.init({
  dsn: 'https://acb4ee1e18704f62a78d269e785ac14a@sentry.io/1403149',
})

if (isLoggedIn()) {
  storeInstance.dispatch({ type: AUTHENTICATED })

  PusherService.connect({
    token: JSON.parse(window.localStorage.token).access_token,
    userId: JSON.parse(window.localStorage.user).id,
  })
}

ReactDOM.render(
  <Provider store={storeInstance}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  serviceWorker.unregister()
  console.log('dev')
} else {
  console.log('prod')
  serviceWorker.register()
}
