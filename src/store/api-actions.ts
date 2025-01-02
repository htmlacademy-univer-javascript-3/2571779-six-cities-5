import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {ApiRoute} from '../api-route.ts';
import {User} from '../models/user.ts';
import {AuthData} from '../models/auth-data.ts';
import {dropToken} from '../services/token.ts';
import {OfferFullInfo} from '../models/offer-full-info.ts';
import {OfferComment} from '../models/offer-comment.ts';
import {State} from "./index";

export const fetchOffersAction = createAsyncThunk<{ offers: OfferShortInfo[] }, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Offers.List);
    return {offers: data};
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<{ offers: OfferShortInfo[] }, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/favoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Favorite.List);
    return {offers: data};
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<{ offers: OfferShortInfo[] }, string, {
  dispatch: AppDispatch;
  state: State,
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferShortInfo[]>(ApiRoute.Offers.GetNearbyFor(offerId));
    return {offers: data.slice(0, 3)};
  },
);

export const fetchCommentsAction = createAsyncThunk<{ comments: OfferComment[] }, string, {
  dispatch: AppDispatch;
  state: State,
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferComment[]>(ApiRoute.Comments.GetListFor(offerId));
    return {comments: data};
  },
);

export const postCommentAction = createAsyncThunk<
  { comment: OfferComment },
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State,
    extra: AxiosInstance;
  }>(
  'data/postComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<OfferComment>(ApiRoute.Comments.GetListFor(offerId), {comment, rating});
    return {comment: data};
  },
);

export const fetchFullOfferInfoAction = createAsyncThunk<{ offer: OfferFullInfo }, string, {
  dispatch: AppDispatch;
  state: State,
  extra: AxiosInstance;
}>(
  'data/fullOfferInfo',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferFullInfo>(ApiRoute.Offers.GetOne(offerId));
    dispatch(fetchNearbyOffersAction(offerId));
    dispatch(fetchCommentsAction(offerId));
    return {offer: data};
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void,
  { offer: OfferShortInfo; status: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({offer, status}, {extra: api}) => {
    await api.post<OfferFullInfo>(ApiRoute.Favorite.SetStatus(offer.id, status));
  },
);

export const checkAuthAction = createAsyncThunk<{ user: User }, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>(ApiRoute.Login);
    return {user: data};
  },
);

export const loginAction = createAsyncThunk<{ user: User }, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(ApiRoute.Login, {email, password});
    dispatch(fetchFavoriteOffersAction());
    return {user: data};
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
  },
);
