import React from 'react';

interface IOfferPriceProps {
  price: number;
}

export const OfferPrice: React.FC<IOfferPriceProps> = ({price}) => (
  <div className="offer__price">
    <b className="offer__price-value">&euro;{price}</b>
    <span className="offer__price-text">&nbsp;night</span>
  </div>
);
