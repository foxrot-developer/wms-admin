import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bootstrap from 'bootstrap';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import adminReducer from './store/admin/reducers/adminReducer';


const { persistStore, persistReducer } = require("redux-persist");

const rootReducer = combineReducers({
  admin: adminReducer
});

let devtools, store;
const isClient = typeof window !== "undefined";
if (isClient) {
  devtools =
    process.browser && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f;

  const storage = require("redux-persist/lib/storage").default;
  const persistConfig = {
    key: "wms-admin",
    storage,
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(applyMiddleware(thunk), devtools)
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
