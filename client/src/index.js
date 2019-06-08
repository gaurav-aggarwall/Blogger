import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';

import './index.css';

import App from './App';
import reducers from './store/reducers/reducer';

import axios from 'axios';
window.axios = axios;

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


