import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './i18Next';

import adminReducer from './store/admin/reducers/adminReducer';
import productReducer from './store/product/reducers/productReducer';
import shelfReducer from './store/shelf/reducers/shelfReducer';
import stockReducer from './store/stock/reducer/stockReducer';
import warehouseReducer from './store/warehouse/warehouseReducer';

const { persistStore, persistReducer } = require('redux-persist');

const rootReducer = combineReducers({
  admin: adminReducer,
  product: productReducer,
  shelf: shelfReducer,
  stock: stockReducer,
  warehouse: warehouseReducer,
});

let devtools, store;
const isClient = typeof window !== 'undefined';
if (isClient) {
  // devtools =
  //   process.browser && window.__REDUX_DEVTOOLS_EXTENSION__
  //     ? window.__REDUX_DEVTOOLS_EXTENSION__()
  //     : (f) => f;

  const storage = require('redux-persist/lib/storage').default;
  const persistConfig = {
    key: 'wms-admin',
    storage,
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(applyMiddleware(thunk))
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
