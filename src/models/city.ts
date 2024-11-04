import {Location} from './location.ts';

export class City {
  public constructor(name: string, location: Location) {
    this.name = name;
    this.location = location;
  }

  public name: string;
  public location: Location;
}
