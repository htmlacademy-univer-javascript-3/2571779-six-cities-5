import {OfferShortInfo} from '../../../models/offer-short-info.ts';

export class SortOption {
  public static WithDefaultOptions(): SortOption[] {
    return [
      new SortOption('Popular', () => 0),
      new SortOption('Price: low to high', (a, b) => a.price - b.price),
      new SortOption('Price: high to low', (a, b) => b.price - a.price),
      new SortOption('Top rated first', (a, b) => b.rating - a.rating),
    ];
  }

  public constructor(name: string, sortFn: (a: OfferShortInfo, b: OfferShortInfo) => number) {
    this.name = name;
    this.sortFn = sortFn;
  }

  public sortFn: (a: OfferShortInfo, b: OfferShortInfo) => number;
  public name: string;
}
