import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {IInitialState} from './reducer.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {
  addComment,
  redirectMw,
  setAuthorization, setComments,
  setFavoriteOffers, setFullOfferInfo,
  setIsDataLoaded,
  setLocalUser, setNearbyOffers, setOffer,
  setOffersList
} from './action.ts';
import {ApiRoute} from '../api-route.ts';
import {User} from '../models/user.ts';
import {AuthorizationStatus} from '../shared/const.ts';
import {AuthData} from '../models/auth-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {AppRoute} from '../app-route.ts';
import {OfferFullInfo} from '../models/offer-full-info.ts';
import {OfferComment} from '../models/offer-comment.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Offers.List);
    dispatch(setOffersList({offers: data}));
    dispatch(setIsDataLoaded({isLoaded: true}));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Offers.GetNearbyFor(offerId));
    dispatch(setNearbyOffers({offers: data.slice(0, 3)}));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferComment[]>(ApiRoute.Comments.GetListFor(offerId));
    dispatch(setComments({comments: data}));
  },
);

export const postCommentAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<OfferComment>(ApiRoute.Comments.GetListFor(offerId), {comment, rating});
    dispatch(addComment({comment: data}));
  },
);


export const fetchFullOfferInfoAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/fullOfferInfo',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferFullInfo>(ApiRoute.Offers.GetOne(offerId));
      dispatch(setFullOfferInfo({offer: data}));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchCommentsAction(offerId));
    } catch (error) {
      dispatch(redirectMw({route: AppRoute.NotFound}));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/favoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Favorite.List);
    dispatch(setFavoriteOffers({offers: data}));
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void, { offer: OfferShortInfo; status: boolean }, {
  dispatch: AppDispatch;
  state: IInitialState;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({offer, status}, {dispatch, getState, extra: api}) => {
    await api.post<OfferFullInfo>(ApiRoute.Favorite.SetStatus(offer.id, status));
    const state = getState();
    const updatedOffer = {...offer, isFavorite: status};
    if (status) {
      dispatch(setFavoriteOffers({offers: [...state.favoriteOffers, updatedOffer]}));
    } else {
      dispatch(setFavoriteOffers({offers: state.favoriteOffers.filter((o) => o.id !== offer.id)}));
    }
    dispatch(setOffer({offer: updatedOffer}));
  },
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
      dispatch(fetchFavoriteOffersAction());
      dispatch(setLocalUser({user: data}));
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
    dispatch(fetchFavoriteOffersAction());
    dispatch(setLocalUser({user: data}));
    dispatch(redirectMw({route: AppRoute.Main}));
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
    dispatch(setLocalUser({user: null}));
    dispatch(setFavoriteOffers({offers: []}));
    dispatch(fetchOffersAction());
  },
);
