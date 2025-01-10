import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../app-route.ts';
import {FavoritesList} from './favorites-list.tsx';
import {Header} from '../../components/header.tsx';
import {useAppSelector} from '../../hooks/use-app-selector';
import {getFavorites} from '../../store/offers-data/offers-data.selectors';

export const FavoritesPage: React.FC = () => {
  const offers = useAppSelector(getFavorites);

  return (
    <div className="page">
      <Header addNavigation/>

      {offers && offers.length > 0 && (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <FavoritesList offers={offers}/>
              </ul>
            </section>
          </div>
        </main>
      )}
      {(!offers || offers.length === 0) && (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};
