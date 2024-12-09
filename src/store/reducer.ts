import {createReducer} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {
  addComment,
  setActiveCity,
  setAuthorization, setComments,
  setFavoriteOffers, setFullOfferInfo,
  setLocalUser, setNearbyOffers, setOffer,
  setOffersList,
  setSortOption
} from './action.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {AuthorizationStatus, CITIES} from '../shared/const.ts';
import {SortOption} from '../pages/main/shared/sort-option.ts';
import {User} from '../models/user.ts';
import {OfferComment} from '../models/offer-comment.ts';
import {OfferFullInfo} from '../models/offer-full-info.ts';

export interface IInitialState {
  currentCity: City;
  offersViewList: OfferShortInfo[];
  favoriteOffers: OfferShortInfo[];
  sortOption: SortOption;
  authStatus: AuthorizationStatus;
  localUser: User | null;
  isDataLoading: boolean;
  offerFullInfo: OfferFullInfo | null;
  nearbyOffers: OfferShortInfo[];
  comments: OfferComment[];
}

const initialState: IInitialState = {
  currentCity: CITIES[3],
  offersViewList: [],
  favoriteOffers: [],
  sortOption: SortOption.WithDefaultOptions()[0],
  authStatus: AuthorizationStatus.Unknown,
  localUser: null,
  isDataLoading: false,
  offerFullInfo: null,
  nearbyOffers: [],
  comments: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      const {city} = action.payload;
      state.currentCity = city;
    })
    .addCase(setOffersList, (state, action) => {
      const {offers} = action.payload;
      state.offersViewList = offers;
    })
    .addCase(setOffer, (state, action) => {
      const {offer} = action.payload;
      state.offersViewList = state.offersViewList.map((item) =>
        item.id === offer.id ? offer : item
      );
    })
    .addCase(setFullOfferInfo, (state, action) => {
      const {offer} = action.payload;
      state.offerFullInfo = offer;
    })
    .addCase(setNearbyOffers, (state, action) => {
      const {offers} = action.payload;
      state.nearbyOffers = offers;
    })
    .addCase(setComments, (state, action) => {
      const {comments} = action.payload;
      state.comments = comments;
    })
    .addCase(addComment, (state, action) => {
      const {comment} = action.payload;
      state.comments.push(comment);
    })
    .addCase(setFavoriteOffers, (state, action) => {
      const {offers} = action.payload;
      state.favoriteOffers = offers;
    })
    .addCase(setSortOption, (state, action) => {
      const {option} = action.payload;
      state.sortOption = option;
    })
    .addCase(setLocalUser, (state, action) => {
      const {user} = action.payload;
      state.localUser = user;
    })
    .addCase(setAuthorization, (state, action) => {
      const {status} = action.payload;
      state.authStatus = status;
    });
});
