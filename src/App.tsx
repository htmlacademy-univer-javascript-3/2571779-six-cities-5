import {MainPage} from './Pages/Main.tsx';
import {TestData} from './Mock/TestData.ts';
import React from 'react';

export const App: React.FC = () => {
  const offers = TestData.Offers();

  return (
    <MainPage offers={offers}/>
  );
};
