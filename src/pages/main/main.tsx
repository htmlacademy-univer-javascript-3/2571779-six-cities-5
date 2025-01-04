import React, {useState} from 'react';
import {OffersList} from './components/offers-list.tsx';
import {Header} from '../../components/header.tsx';
import {CITIES} from '../../shared/const.ts';
import {Map} from '../../components/map.tsx';
import {OfferBase} from '../../models/offer-base.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {CitiesList} from './components/cities-list.tsx';
import {SortOptions} from './components/sort-options.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {getCurrentCity} from "../../store/navigation-data/navigation-data.selectors";
import {getIsDataLoaded, getSortedOffers} from "../../store/offers-data/offers-data.selectors";

export const MainPage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<OfferBase | null>(null);
  const city = useAppSelector(getCurrentCity);
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const sortedOffers = useAppSelector(getSortedOffers);

  return (
    <div className="page page--gray page--main">
      <Header addNavigation isLogoActive/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES}/>
        {isDataLoaded && (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {city.name}</b>
                <SortOptions/>
                <OffersList
                  offers={sortedOffers}
                  setActiveOffer={setActiveCard}
                />
              </section>
              <div className="cities__right-section">
                <Map city={city} offersLocation={sortedOffers} activeLocationId={activeCard?.id}/>
              </div>
            </div>
          </div>
        )}
        {!isDataLoaded && <Spinner/>}
      </main>
    </div>
  );
};
