import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {IInitialState} from './reducer.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {setAuthorization, setOffersList} from './action.ts';
import {ApiRoute} from '../api-route.ts';
import {User} from '../models/user.ts';
import {AuthorizationStatus} from '../shared/const.ts';
import {AuthData} from '../models/auth-data.ts';
import {dropToken, saveToken} from '../services/token.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Offers);
    dispatch(setOffersList({offers: data}));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<User>(ApiRoute.Login);
      dispatch(setAuthorization({status: AuthorizationStatus.Auth}));
    } catch (error) {
      dispatch(setAuthorization({status: AuthorizationStatus.NoAuth}));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setAuthorization({status: AuthorizationStatus.Auth}));
    dispatch(fetchOffersAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setAuthorization({status: AuthorizationStatus.NoAuth}));
    dispatch(fetchOffersAction());
  },
);
