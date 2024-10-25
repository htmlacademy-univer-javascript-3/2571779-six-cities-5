import {Host} from './host.ts';
import {OfferBase} from './offer-base.ts';

export class OfferFullInfo extends OfferBase {
  public images: string[];
  public description: string;
  public bedrooms: number;
  public goods: string[];
  public host: Host;
  public maxAdults: number;
}
