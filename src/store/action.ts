import {createAction} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {SortOption} from '../pages/main/shared/sort-option.ts';
import {AuthorizationStatus} from "../shared/const.ts";

export const setActiveCity = createAction<{city: City}>('navigation/setActiveCity');

export const setOffersList = createAction<{offers: OfferShortInfo[]}>('offerList/matchOffers');

export const setSortOption = createAction<{option: SortOption}>('view/sortOption');

export const setAuthorization = createAction<{status: AuthorizationStatus}>('user/setAuthStatus');
