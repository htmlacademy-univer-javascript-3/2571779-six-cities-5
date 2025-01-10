import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {browserHistory} from '../../browserHistory.ts';
import {rootReducer} from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'navigation/redirect') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
