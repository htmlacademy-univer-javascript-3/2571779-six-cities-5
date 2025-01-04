import {State} from '../../types/state';
import {OfferShortInfo} from '../../models/offer-short-info';
import {NameSpace} from '../../shared/const';
import {createSelector} from '@reduxjs/toolkit';
import {getCurrentCity, getSortOption} from '../navigation-data/navigation-data.selectors';

export const getFavorites = (state: State): OfferShortInfo[] => state[NameSpace.Data].favoriteOffers;
export const getOfferShortInfo = (state: State, id: string): OfferShortInfo | null => state[NameSpace.Data].offersViewList.find((o) => o.id === id) ?? null;
export const getOffersViewList = (state: State): OfferShortInfo[] => state[NameSpace.Data].offersViewList;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getSortedOffers = createSelector(
  [getOffersViewList, getCurrentCity, getSortOption],
  (offers, city, sort) => offers
    .filter((offer) => offer.city.name === city.name)
    .slice()
    .sort(sort.sortFn));
