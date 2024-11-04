export class Location {
  public constructor(latitude: number, longitude: number, zoom: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
  }

  public latitude: number;
  public longitude: number;
  public zoom: number;
}
