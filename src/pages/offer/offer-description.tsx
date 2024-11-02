import React from 'react';
import {OfferFullInfo} from '../../models/offer-full-info.ts';
import {OfferHostDescription} from './offer-host-description.tsx';

interface IOfferDescriptionProps {
  offer: OfferFullInfo;
}

export const OfferDescription: React.FC<IOfferDescriptionProps> = ({offer}) => (
  <div className="offer__host">
    <OfferHostDescription host={offer.host}/>
    <div className="offer__description">
      <p className="offer__text">
        {offer.description}
      </p>
    </div>
  </div>
);
