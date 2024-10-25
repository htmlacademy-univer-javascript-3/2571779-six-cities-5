import {Offer} from '../models/offer.ts';
import offersJson from './offers.json';

export class TestData {
  public static Offers(): Offer[] {
    return offersJson as Offer[];
  }
}
