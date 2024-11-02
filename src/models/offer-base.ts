import {City} from './city.ts';
import {Location} from './location.ts';

export abstract class OfferBase {
  public id: string;
  public title: string;
  public type: OfferType;
  public price: number;
  public city: City;
  public location: Location;
  public isFavorite: boolean;
  public isPremium: boolean;
  public rating: number;
}

export type OfferType = 'apartment' | 'room' | 'hotel';
