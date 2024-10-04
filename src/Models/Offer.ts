import {City} from './City.ts';
import {Location} from './Location.ts';

export class Offer {
  public id: string;
  public title: string;
  public type: string;
  public price: number;
  public previewImage: string;
  public city: City;
  public location: Location;
  public isFavorite: boolean;
  public isPremium: boolean;
  public rating: number;
}
