import React, {useMemo} from 'react';
import {OfferShortInfo} from '../../models/offer-short-info.ts';
import {FavoriteCard} from './favorite-card.tsx';
import {Link} from 'react-router-dom';

interface IFavoritesListProps {
  offers: OfferShortInfo[];
}

export const FavoritesList: React.FC<IFavoritesListProps> = ({offers}) => {
  const groups = useMemo(() => {
    const map = new Map<string, OfferShortInfo[]>();
    offers.forEach((offer) => {
      const collection = map.get(offer.city.name) ?? null;
      if (!collection) {
        map.set(offer.city.name, [offer]);
      } else {
        collection.push(offer);
      }
    });

    return map;
  }, [offers]);


  return (
    <ul className="favorites__list">
      {[...groups.entries()].map(([cityName, cityOffers]) => (
        <li className="favorites__locations-items" key={cityName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((cityOffer) => (
              <FavoriteCard offer={cityOffer} key={cityOffer.id}/>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
