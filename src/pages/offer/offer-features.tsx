import React from 'react';
import {OfferType} from '../../models/offer-base.ts';

interface IOfferFeaturesProps {
  bedroomsCount: number;
  maxAdults: number;
  type: OfferType;
}

function capitalizeFirstLetter(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export const OfferFeatures: React.FC<IOfferFeaturesProps> = ({bedroomsCount, maxAdults, type}) => (
  <ul className="offer__features">
    <li className="offer__feature offer__feature--entire">
      {capitalizeFirstLetter(type)}
    </li>
    <li className="offer__feature offer__feature--bedrooms">
      {bedroomsCount} Bedrooms
    </li>
    <li className="offer__feature offer__feature--adults">
      Max {maxAdults} adults
    </li>
  </ul>
);
