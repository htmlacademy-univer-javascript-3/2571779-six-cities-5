import {State} from "../../types/state";
import {NameSpace} from "../../shared/const";
import {OfferFullInfo} from "../../models/offer-full-info";
import {OfferShortInfo} from "../../models/offer-short-info";
import {OfferComment} from "../../models/offer-comment";

export const getOfferFullInfo = (state: State): OfferFullInfo | null => state[NameSpace.OfferInfo].offerFullInfo;
export const getNearbyOffers = (state: State): OfferShortInfo[] => state[NameSpace.OfferInfo].nearbyOffers;
export const getOfferComments = (state: State): OfferComment[] => state[NameSpace.OfferInfo].comments;
