import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../app-route.ts';
import {FavoritesList} from './favorites-list.tsx';
import {Header} from '../../components/header.tsx';

export const FavoritesPage: React.FC = () => (
  <div className="page">
    <Header addNavigation/>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoritesList/>
          </ul>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  </div>
);
