// @flow
// external modules
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// internal modules
import reducers from './src/main';
import { loadState, saveState } from './src/main/localStorage';
import Root from './src/main/Root';

const appReducers = combineReducers({
  ...reducers
});

const initialState = {
  contacts: loadState() || [],
};

const store = createStore(appReducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => saveState(store.getState().contacts));

render(<Root store={store} />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // $FlowIssue Enable Webpack hot module replacement for reducers
    module.hot.accept();
  }
}
