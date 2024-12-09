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

export const MainPage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<OfferBase | null>(null);
  const activeCity = useAppSelector((state) => state.currentCity);
  const sort = useAppSelector((state) => state.sortOption);
  const city = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offersViewList
    .filter((offer) => offer.city.name === city.name)
    .sort(sort.sortFn));

  if (!offers) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header addNavigation isLogoActive/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
              <SortOptions/>
              <OffersList
                offers={offers.filter((x) => x.city.name === activeCity.name)}
                setActiveOffer={setActiveCard}
              />
            </section>
            <div className="cities__right-section">
              <Map city={activeCity} offersLocation={offers} activeLocationId={activeCard?.id}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
