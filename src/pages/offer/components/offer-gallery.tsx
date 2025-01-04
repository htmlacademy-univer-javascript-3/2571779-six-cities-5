import React from 'react';

interface IOfferGalleryProps {
  images: string[];
}

export const OfferGallery: React.FC<IOfferGalleryProps> = React.memo(({images}) => (
  <div className="offer__gallery">
    {images.map((image, i) => (
      <div className="offer__image-wrapper" key={i}>
        <img className="offer__image" src={image} alt="Photo studio"/>
      </div>
    ))}
  </div>
));
