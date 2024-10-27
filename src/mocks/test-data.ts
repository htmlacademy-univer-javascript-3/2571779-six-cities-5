import {OfferShortInfo} from '../models/offer-short-info.ts';
import {OfferFullInfo} from '../models/offer-full-info.ts';
import {OfferComment} from '../models/offer-comment.ts';
import offersJson from './offers.json';
import favoritesJson from './favorites.json';
import offerFullInfoJson from './offer-full-info.json';
import offerCommentsJson from './offer-comments.json';

export class TestData {
  public static Offers(): OfferShortInfo[] {
    return offersJson as OfferShortInfo[];
  }

  public static Favorites(): OfferShortInfo[] {
    return favoritesJson as OfferShortInfo[];
  }

  public static OfferDescription(): OfferFullInfo {
    return offerFullInfoJson as OfferFullInfo;
  }

  public static Comments(): OfferComment[] {
    return offerCommentsJson as OfferComment[];
  }
}
