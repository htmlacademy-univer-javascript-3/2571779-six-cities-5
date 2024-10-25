import React from 'react';
import {AuthorizationStatus} from './const.tsx';
import {Navigate} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';

interface IPrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({authorizationStatus, children}) => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login}/>
);
