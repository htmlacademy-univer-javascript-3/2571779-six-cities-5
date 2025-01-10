import {NameSpace} from '../shared/const';
import {offersReducer} from './offers-data/offers-data.slice';
import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './user-data/user-data.slice';
import {offerInfoReducer} from './offer-info/offer-info.slice';
import {navigationDataReducer} from './navigation-data/navigation-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersReducer,
  [NameSpace.User]: userReducer,
  [NameSpace.OfferInfo]: offerInfoReducer,
  [NameSpace.Navigation]: navigationDataReducer,
});

