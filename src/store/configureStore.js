import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducers from '../reducers';

function getMiddleware() {
  const isDev = !['production', 'test'].includes(process.env.NODE_ENV);
  const extension = (isDev && window.devToolsExtension) ? window.devToolsExtension() : (f) => f;
  const middlewares = [thunk];

  if (isDev) {
    middlewares.push(createLogger());
    middlewares.push(reduxImmutableStateInvariant());
  }

  return compose(applyMiddleware(...middlewares), extension);
}

export function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    getMiddleware()
  );
}
