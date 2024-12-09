import {createReducer} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {setActiveCity, setAuthorization, setOffersList, setSortOption} from './action.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {AuthorizationStatus, CITIES} from '../shared/const.ts';
import {TestData} from '../mocks/test-data.ts';
import {SortOption} from '../pages/main/shared/sort-option.ts';

export interface IInitialState {
  currentCity: City;
  offersViewList: OfferShortInfo[];
  sortOption: SortOption;
  authStatus: AuthorizationStatus;
}

const initialState: IInitialState = {
  currentCity: CITIES[3],
  offersViewList: TestData.Offers(),
  sortOption: SortOption.WithDefaultOptions()[0],
  authStatus: AuthorizationStatus.Unknown,
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
    .addCase(setSortOption, (state, action) => {
      const {option} = action.payload;
      state.sortOption = option;
    })
    .addCase(setAuthorization, (state, action) => {
      const {status} = action.payload;
      state.authStatus = status;
    });
});
