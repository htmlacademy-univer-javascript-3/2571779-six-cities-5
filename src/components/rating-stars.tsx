import React from 'react';

interface IRatingStarsProps {
  rating: number;
}

function ratingToWidth(rating: number): string {
  const percent = 100 * rating / 5.0;
  return `${percent}%`;
}

export const RatingStars: React.FC<IRatingStarsProps> = ({rating}) => (
  <>
    <span style={{width: ratingToWidth(rating)}}></span>
    <span className="visually-hidden">Rating</span>
  </>
);
