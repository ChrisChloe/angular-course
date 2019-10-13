import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import  configureStore from './config/store';
import {Router, hashHistory} from 'react-router';
import routes from './config/routes';
import Raven from 'raven-js';
import {sentry_url} from "./config/sentry";

const store = configureStore();
const commit = process.env.COMMIT || "master";

if (process.env.NODE_ENV === 'production'){
    // Raven.config(sentry_url,{
    //     tags:{
    //         git_commit:commit
    //     }
    // }).install();
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>
    , document.getElementById('root'));

// registerServiceWorker();
