import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../app-route.ts';
import {OfferFullInfo} from '../../models/offer-full-info.ts';
import {OfferGallery} from './offer-gallery.tsx';
import {RatingStars} from '../../components/rating-stars.tsx';
import {OfferFeatures} from './offer-features.tsx';
import {OfferInside} from './offer-inside.tsx';
import {OfferDescription} from './offer-description.tsx';
import {OfferReviews} from './offer-reviews.tsx';
import {OfferComment} from '../../models/offer-comment.ts';
import {OfferPrice} from './offer-price.tsx';
import {OfferShortInfo} from '../../models/offer-short-info.ts';
import {NearPlaceCard} from './near-place-card.tsx';
import {Map} from '../../components/map/map.tsx';

interface IOfferPageProps {
  offer: OfferFullInfo;
  nearOffers: OfferShortInfo[];
  comments: OfferComment[];
}

export const OfferPage: React.FC<IOfferPageProps> = ({offer, nearOffers, comments}) => (
  <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <Link className="header__favorite-count" to={AppRoute.Favorites}>3</Link>
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <OfferGallery images={offer.images}/>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <RatingStars rating={offer.rating}/>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <OfferFeatures type={offer.type} maxAdults={offer.maxAdults} bedroomsCount={offer.bedrooms}/>
            <OfferPrice price={offer.price}/>
            <OfferInside goods={offer.goods}/>
            <OfferDescription offer={offer}/>
            <OfferReviews comments={comments}/>
          </div>
        </div>
        <Map/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers.map((nearOffer, i) => (
              <NearPlaceCard offer={nearOffer} key={i}/>
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
);
