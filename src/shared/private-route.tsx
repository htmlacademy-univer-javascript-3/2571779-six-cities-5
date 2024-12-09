import React from 'react';
import {AuthorizationStatus} from './const.ts';
import {Navigate} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';
import {useAppSelector} from '../hooks/use-app-selector.ts';

interface IPrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({children}) => {
  const authorizationStatus = useAppSelector((state) => state.authStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
};
