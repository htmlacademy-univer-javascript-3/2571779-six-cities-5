import React from 'react';

interface ICardPremiumMarkProps {
  isPremium: boolean;
}

export const CardPremiumMark: React.FC<ICardPremiumMarkProps> = ({isPremium}) =>
  isPremium ? (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  ) : null;
