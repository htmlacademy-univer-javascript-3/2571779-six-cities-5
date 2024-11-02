import React, {useState} from 'react';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {OfferDescription} from './offer-description.tsx';
import {CardPremiumMark} from './card-premium-mark.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';

interface IOfferCardProps {
  offer: OfferShortInfo;
}

export const OfferCard: React.FC<IOfferCardProps> = ({offer}) => {
  const [activeCard, setActiveCard] = useState();

  return (
    <article className="cities__card place-card">
      <CardPremiumMark isPremium={offer.isPremium}/>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer.CreateOne(offer.id)}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <OfferDescription offer={offer}/>
      </div>
    </article>
  );
};
