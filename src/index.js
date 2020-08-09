import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import './assets/sass/packages.scss';
import 'bootstrap/dist/js/bootstrap.min.js'
import store from './redux/redux-store';
import i18next from './i18next';

ReactDOM.render(
    <Suspense fallback={(<div>Loading</div>)}>
        <Provider store={store}>
            <App/>
        </Provider>
    </Suspense>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
