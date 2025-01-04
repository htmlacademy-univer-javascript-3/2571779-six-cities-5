import React from 'react';
import {OfferDescription} from '../../../components/offer-description.tsx';
import {CardPremiumMark} from '../../../components/card-premium-mark.tsx';
import {OfferShortInfo} from '../../../models/offer-short-info.ts';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../app-route.ts';

interface INearPlaceCardsProps {
  offers: OfferShortInfo[];
}

export const NearPlaceCards: React.FC<INearPlaceCardsProps> = React.memo(({offers}) => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <article className="near-places__card place-card">
            <CardPremiumMark isPremium={offer.isPremium}/>
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <Link to={AppRoute.Offer.CreateOne(offer.id)}>
                <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
              </Link>
            </div>
            <OfferDescription offer={offer}/>
          </article>
        ))}
      </div>
    </section>
  </div>
));
