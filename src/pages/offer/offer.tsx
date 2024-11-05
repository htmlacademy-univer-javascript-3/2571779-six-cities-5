import React from 'react';
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
import {Header} from '../../components/header.tsx';

interface IOfferPageProps {
  offer: OfferFullInfo;
  nearOffers: OfferShortInfo[];
  comments: OfferComment[];
}

export const OfferPage: React.FC<IOfferPageProps> = ({offer, nearOffers, comments}) => (
  <div className="page">
    <Header addNavigation/>

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
        <div style={{height: '550px', width: '1100px', margin: 'auto'}}>
          <Map
            city={offer.city}
            offersLocation={[...nearOffers, offer]}
            activeLocationId={offer.id}
          />
        </div>
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
