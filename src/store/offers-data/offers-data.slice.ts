import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NameSpace} from "../../shared/const";
import {OfferShortInfo} from "../../models/offer-short-info";
import {changeFavoriteStatusAction, fetchFavoriteOffersAction, fetchOffersAction} from "../api-actions";

export interface IOffersDataInitialState {
  offersViewList: OfferShortInfo[];
  favoriteOffers: OfferShortInfo[];
  isDataLoaded: boolean;
}


const initialState: IOffersDataInitialState = {
  offersViewList: [],
  favoriteOffers: [],
  isDataLoaded: false
};

const offersDataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setOffersList: (state, action: PayloadAction<{ offers: OfferShortInfo[] }>) => {
      const {offers} = action.payload;
      state.offersViewList = offers;
    },
    setFavoriteOffers: (state, action: PayloadAction<{ offers: OfferShortInfo[] }>) => {
      const {offers} = action.payload;
      state.favoriteOffers = offers;
    },
    setOffer: (state, action: PayloadAction<{ offer: OfferShortInfo }>) => {
      const {offer} = action.payload;
      state.offersViewList = state.offersViewList.map((item) =>
        item.id === offer.id ? offer : item
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        offersDataSlice.caseReducers.setOffersList(state, action);
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        offersDataSlice.caseReducers.setFavoriteOffers(state, action);
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const {offer, status} = action.meta.arg;
        const updatedOffer = {...offer, isFavorite: status};

        if (status) {
          state.favoriteOffers.push(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(o => o.id !== offer.id);
        }

        state.offersViewList = state.offersViewList.map((item) =>
          item.id === updatedOffer.id ? updatedOffer : item
        );
      })
  }
});

export const {setOffersList, setOffer, setFavoriteOffers} = offersDataSlice.actions;
export const offersReducer = offersDataSlice.reducer;
