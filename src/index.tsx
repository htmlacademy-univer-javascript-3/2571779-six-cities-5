import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction} from './store/api-actions.ts';
import {ConfiguredToastContainer} from './components/toast';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfiguredToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>
);
