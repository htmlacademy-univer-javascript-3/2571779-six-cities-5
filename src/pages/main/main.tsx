import React, {useState} from 'react';
import {OffersList} from './components/offers-list.tsx';
import {Header} from '../../components/header.tsx';
import {CITIES} from '../../shared/const.ts';
import {Map} from '../../components/map.tsx';
import {OfferBase} from '../../models/offer-base.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {CitiesList} from './components/cities-list.tsx';

export const MainPage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<OfferBase | null>(null);
  const activeCity = useAppSelector((state) => state.currentCity);
  const offers = useAppSelector((state) => state.offersViewList);

  return (
    <div className="page page--gray page--main">
      <Header addNavigation isLogoActive/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <CitiesList cities={CITIES}/>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>

              <OffersList offers={offers.filter((x) => x.city.name === activeCity.name)} setActiveOffer={setActiveCard}/>
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
