import {MainPage} from './pages/main/main.tsx';
import {TestData} from './mocks/test-data.ts';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from './app-route.ts';
import {FavoritesPage} from './pages/favorites/favorites.tsx';
import {LoginPage} from './pages/login.tsx';
import {NotFoundPage} from './pages/not-found.tsx';
import {OfferPage} from './pages/offer/offer.tsx';
import {PrivateRoute} from './shared/private-route.tsx';
import {AuthorizationStatus} from './shared/const.tsx';

export const App: React.FC = () => {
  const offers = TestData.Offers();
  const favoriteOffers = TestData.Favorites();
  const offerDescription = TestData.OfferDescription();
  const comments = TestData.Comments();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage offers={offers}/>}/>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage offers={favoriteOffers}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.Offer.Template} element={<OfferPage offer={offerDescription} nearOffers={offers.slice(0, 3)} comments={comments}/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};
