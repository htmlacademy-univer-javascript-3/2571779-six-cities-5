import React from 'react';
import {OfferDescription} from '../../../components/offer-description.tsx';
import {CardPremiumMark} from '../../../components/card-premium-mark.tsx';
import {OfferShortInfo} from '../../../models/offer-short-info.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../app-route.ts';

interface INearPlaceCardProps {
  offer: OfferShortInfo;
}

export const NearPlaceCard: React.FC<INearPlaceCardProps> = ({offer}) => (
  <article className="near-places__card place-card">
    <CardPremiumMark isPremium={offer.isPremium}/>
    <div className="near-places__image-wrapper place-card__image-wrapper">
      <Link to={AppRoute.Offer.CreateOne(offer.id)}>
        <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
      </Link>
    </div>
    <OfferDescription offer={offer}/>
  </article>
);
