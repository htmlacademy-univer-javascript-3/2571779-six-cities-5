import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api.ts';
import {redirect} from './minddlewares/redirect.ts';
import {rootReducer} from './root-reducer';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
