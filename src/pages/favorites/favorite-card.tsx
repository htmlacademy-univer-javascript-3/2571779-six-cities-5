import {OfferShortInfo} from '../../models/offer-short-info.ts';
import React from 'react';
import {OfferDescription} from '../../components/offer-description.tsx';
import {CardPremiumMark} from '../../components/card-premium-mark.tsx';
import {AppRoute} from '../../app-route.ts';
import {Link} from 'react-router-dom';

interface IFavoriteCardProps {
  offer: OfferShortInfo;
}

export const FavoriteCard: React.FC<IFavoriteCardProps> = ({offer}) => (
  <article className="favorites__card place-card">
    <CardPremiumMark isPremium={offer.isPremium}/>
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <Link to={AppRoute.Offer.CreateOne(offer.id)}>
        <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
      </Link>
    </div>
    <div className="favorites__card-info place-card__info">
      <OfferDescription offer={offer}/>
    </div>
  </article>
);
