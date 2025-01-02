import {OfferShortInfo} from "../../models/offer-short-info";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NameSpace} from "../../shared/const";
import {OfferFullInfo} from "../../models/offer-full-info";
import {OfferComment} from "../../models/offer-comment";
import {
  fetchCommentsAction, fetchFullOfferInfoAction,
  fetchNearbyOffersAction,
  postCommentAction
} from "../api-actions";

export interface IOfferInfoInitialState {
  offerFullInfo: OfferFullInfo | null;
  nearbyOffers: OfferShortInfo[];
  comments: OfferComment[];
}

const initialState: IOfferInfoInitialState = {
  offerFullInfo: null,
  nearbyOffers: [],
  comments: [],
};

const offerInfoSlice = createSlice({
  name: NameSpace.OfferInfo,
  initialState,
  reducers: {
    setFullOfferInfo: (state, action: PayloadAction<{ offer: OfferFullInfo }>) => {
      const {offer} = action.payload;
      state.offerFullInfo = offer;
    },
    setNearbyOffers: (state, action: PayloadAction<{ offers: OfferShortInfo[] }>) => {
      const {offers} = action.payload;
      state.nearbyOffers = offers;
    },
    setComments: (state, action: PayloadAction<{ comments: OfferComment[] }>) => {
      const {comments} = action.payload;
      state.comments = comments;
    },
    addComment: (state, action: PayloadAction<{ comment: OfferComment }>) => {
      const {comment} = action.payload;
      state.comments.push(comment);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFullOfferInfoAction.fulfilled, (state, action) => {
        offerInfoSlice.caseReducers.setFullOfferInfo(state, action);
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        offerInfoSlice.caseReducers.setNearbyOffers(state, action);
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        offerInfoSlice.caseReducers.setComments(state, action);
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        offerInfoSlice.caseReducers.addComment(state, action);
      })
  }
});

export const {setFullOfferInfo, setNearbyOffers, setComments, addComment} = offerInfoSlice.actions;
export const offerInfoReducer = offerInfoSlice.reducer;
