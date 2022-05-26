import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store';
import './style/index.scss';
import './style/tailwind.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);