import {MainPage} from './pages/main/main.tsx';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from './app-route.ts';
import {FavoritesPage} from './pages/favorites/favorites.tsx';
import {LoginPage} from './pages/login.tsx';
import {NotFoundPage} from './pages/not-found.tsx';
import {OfferPage} from './pages/offer/offer.tsx';
import {PrivateRoute} from './shared/private-route.tsx';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route
            path={AppRoute.Offer.Template}
            element={<OfferPage/>}
          />
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};
