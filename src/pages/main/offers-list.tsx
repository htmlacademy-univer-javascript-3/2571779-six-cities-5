import React from 'react';
import {OfferShortInfo} from '../../models/offer-short-info.ts';
import {OfferCard} from '../../components/offer-card.tsx';
import {OfferBase} from '../../models/offer-base.ts';

interface IExportListProps {
  offers: OfferShortInfo[];
  setActiveOffer: (offer: OfferBase | null) => void;
}

export const OffersList: React.FC<IExportListProps> = ({offers, setActiveOffer})=> (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) =>
      <OfferCard key={offer.id} offer={offer} setActiveOffer={setActiveOffer}/>)}
  </div>
);
