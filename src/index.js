import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import throttle from 'lodash/throttle';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./utils/Utils";
import { configureStore } from "./store/configureStore";
import registerServiceWorker from './services/registerServiceWorker';
import { Provider } from 'react-redux';

const initialState = loadStateFromLocalStorage();

const store = configureStore(initialState);
store.subscribe(throttle(() => {
  saveStateToLocalStorage(store.getState())
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
