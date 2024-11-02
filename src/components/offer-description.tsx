import React from 'react';
import {OfferBase} from '../models/offer-base.ts';
import {RatingStars} from './rating-stars.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';

interface IOfferDescriptionProps {
  offer: OfferBase;
}

export const OfferDescription: React.FC<IOfferDescriptionProps> = ({offer}) => (
  <>
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{offer.price}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <button
        className="place-card__bookmark-button {offer.isFavorite && place-card__bookmark-button--active} button"
        type="button"
      >
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">In bookmarks</span>
      </button>
    </div>
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <RatingStars rating={offer.rating}/>
      </div>
    </div>
    <h2 className="place-card__name">
      <Link to={AppRoute.Offer.CreateOne(offer.id)}>{offer.title}</Link>
    </h2>
    <p className="place-card__type">{offer.type}</p>
  </>
);
