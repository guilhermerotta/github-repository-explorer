import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./utils/Utils";
import { configureStore } from "./store/configureStore";
import registerServiceWorker from './services/registerServiceWorker';
import { Provider } from 'react-redux';

const initialState = loadStateFromLocalStorage();
console.log('initial state === ',initialState);

const store = configureStore(initialState);
store.subscribe(() => {
  saveStateToLocalStorage(store.getState())
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
