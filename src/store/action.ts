import {createAction} from '@reduxjs/toolkit';
import {City} from '../models/city.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {SortOption} from '../pages/main/shared/sort-option.ts';
import {AuthorizationStatus} from '../shared/const.ts';
import {User} from '../models/user.ts';
import {AppRoute} from '../app-route.ts';
import {OfferFullInfo} from '../models/offer-full-info.ts';
import {OfferComment} from '../models/offer-comment.ts';

export const setActiveCity = createAction<{city: City}>('navigation/setActiveCity');

export const redirectMw = createAction<{route: AppRoute}>('navigation/redirect');

export const setSortOption = createAction<{option: SortOption}>('view/sortOption');

export const setAuthorization = createAction<{status: AuthorizationStatus}>('user/setAuthStatus');

export const setLocalUser = createAction<{user: User | null}>('user/data');

export const setOffersList = createAction<{offers: OfferShortInfo[]}>('data/setOffersList');

export const setFullOfferInfo = createAction<{offer: OfferFullInfo}>('data/setFullOfferInfo');

export const setNearbyOffers = createAction<{offers: OfferShortInfo[]}>('data/setNearbyOffers');

export const setComments = createAction<{comments: OfferComment[]}>('data/setComments');

export const addComment = createAction<{comment: OfferComment}>('data/addComment');

export const setOffer = createAction<{offer: OfferShortInfo}>('data/setOffer');

export const setFavoriteOffers = createAction<{offers: OfferShortInfo[]}>('data/setFavoriteOffersList');

export const setIsDataLoaded = createAction<{isLoaded: boolean}>('data/setIsDataLoading');
