import {User} from './user.ts';
import {OfferBase} from './offer-base.ts';

export class OfferFullInfo extends OfferBase {
  public images: string[];
  public description: string;
  public bedrooms: number;
  public goods: string[];
  public host: User;
  public maxAdults: number;
}
