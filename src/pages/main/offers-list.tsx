import React from 'react';
import {OfferShortInfo} from '../../models/offer-short-info.ts';
import {OfferCard} from './offer-card.tsx';

interface IExportListProps {
  offers: OfferShortInfo[];
}

export const OffersList: React.FC<IExportListProps> = ({offers})=> (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) =>
      <OfferCard key={offer.id} offer={offer}/>)}
  </div>
);
