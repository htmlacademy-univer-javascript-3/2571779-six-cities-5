import React, {useState} from 'react';
import {OfferShortInfo} from '../../models/offer-short-info.ts';
import {OfferDescription} from '../../components/offer-description.tsx';

interface IOfferCardProps {
  offer: OfferShortInfo;
}

export const OfferCard: React.FC<IOfferCardProps> = ({offer}) => {
  const [activeCard, setActiveCard] = useState();

  return (
    <article className="cities__card place-card">
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <OfferDescription offer={offer}/>
      </div>
    </article>
  );
};
