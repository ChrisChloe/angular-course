import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'

/* eslint no-underscore-dangle: 0 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = preloadedState => createStore(
  reducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
)
export default configureStore
