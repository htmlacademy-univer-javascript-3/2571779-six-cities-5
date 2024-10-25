import {OfferShortInfo} from '../../models/offer-short-info.ts';
import React from 'react';
import {OfferDescription} from '../../components/offer-description.tsx';

interface IFavoriteOfferProps {
  offer: OfferShortInfo;
}

export const FavoriteOffer: React.FC<IFavoriteOfferProps> = ({offer}) => (
  <article className="favorites__card place-card">
    {
      offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    }
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image"/>
      </a>
    </div>
    <div className="favorites__card-info place-card__info">
      <OfferDescription offer={offer}/>
    </div>
  </article>
);
