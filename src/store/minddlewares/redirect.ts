import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {reducer} from '../reducer.ts';
import {browserHistory} from '../../browserHistory.ts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'navigation/redirect') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
