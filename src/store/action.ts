import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../app-route.ts';

export const redirectMw = createAction<{route: AppRoute}>('navigation/redirect');
