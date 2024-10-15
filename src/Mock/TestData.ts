import {Offer} from '../Models/Offer.ts';
import offersJson from './Offers.json';

export class TestData {
  public static Offers(): Offer[] {
    return offersJson as Offer[];
  }
}
