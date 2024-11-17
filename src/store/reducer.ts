import {createReducer} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {setActiveCity, setOffersList} from './action.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {CITIES} from '../shared/const.ts';

interface IInitialState {
  currentCity: City;
  offersViewList: OfferShortInfo[];
}

const initialState: IInitialState = {
  currentCity: CITIES[3],
  offersViewList: [],
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
    });
});
