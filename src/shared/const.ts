import {City} from '../models/city.ts';
import {Location} from '../models/location.ts';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES: City[] = [
  new City('Paris', new Location(48.861944, 2.360833, 13)),
  new City('Cologne', new Location(50.936389, 6.952778, 13)),
  new City('Brussels', new Location(50.846667, 4.3525, 13)),
  new City('Amsterdam', new Location(52.373056, 4.893333, 13)),
  new City('Hamburg', new Location(53.55, 10, 13)),
  new City('Dusseldorf', new Location(51.233333, 6.783333, 13)),
];

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
