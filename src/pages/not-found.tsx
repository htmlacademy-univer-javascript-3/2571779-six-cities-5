import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';
import {Header} from '../components/header.tsx';

export const NotFoundPage: React.FC = () => (
  <div className="page">
    <Header addNavigation/>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <div className="favorites__title" style={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
            <span>Ooops...</span>
            <div>
              <h2 className="place-card__name">Page not found :(</h2>
              <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
                <span>Return to the main page</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
);
