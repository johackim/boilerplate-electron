import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './app/reducers';
import App from './app/App';

global.API_URL = 'http://0.0.0.0:9000';

const store = createStore(reducers, applyMiddleware(thunk));
store.subscribe(() => {
    console.log('store changed!', store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
