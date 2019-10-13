import reducers from '../reducers/index';
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(reducers, initialState, applyMiddleware(reduxThunk, reduxPromise))
}
