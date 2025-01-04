import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CITIES, NameSpace} from "../../shared/const";
import {City} from "../../models/city";
import {SortOption} from "../../pages/main/shared/sort-option";

interface INavigationDataInitialState {
  currentCity: City;
  sortOption: SortOption;
}

const initialState: INavigationDataInitialState = {
  currentCity: CITIES[3],
  sortOption: SortOption.WithDefaultOptions()[0],
};

const navigationDataSlice = createSlice({
  name: NameSpace.Navigation,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<{city: City}>) => {
      const {city} = action.payload;
      state.currentCity = city;
    },
    setSortOption: (state, action: PayloadAction<{option: SortOption}>) => {
      const {option} = action.payload;
      state.sortOption = option;
    },
  },
});

export const {setActiveCity, setSortOption} = navigationDataSlice.actions;
export const navigationDataReducer = navigationDataSlice.reducer;
