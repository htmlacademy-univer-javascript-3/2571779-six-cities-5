import {createReducer} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {setActiveCity, setOffersList, setSortOption} from './action.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {CITIES} from '../shared/const.ts';
import {TestData} from '../mocks/test-data.ts';
import {SortOption} from '../pages/main/shared/sort-option.ts';

interface IInitialState {
  currentCity: City;
  offersViewList: OfferShortInfo[];
  sortOption: SortOption;
}

const initialState: IInitialState = {
  currentCity: CITIES[3],
  offersViewList: TestData.Offers(),
  sortOption: SortOption.WithDefaultOptions()[0],
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
    });
});
