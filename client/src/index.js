import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

// arg1 - all the reducers in app
// arg2 - initial state of app
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    // <App /> as child of <Provider>
    // when new state, provider will inform all it's children
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
