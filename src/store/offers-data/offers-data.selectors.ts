import {State} from "../../types/state";
import {OfferShortInfo} from "../../models/offer-short-info";
import {NameSpace} from "../../shared/const";

export const getFavorites = (state: State): OfferShortInfo[] => state[NameSpace.Data].favoriteOffers;
export const getOfferShortInfo = (state: State, id: string): OfferShortInfo | null => state[NameSpace.Data].offersViewList.find((o) => o.id === id) ?? null
