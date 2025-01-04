import React from 'react';

interface IOfferGalleryProps {
  images: string[];
}

const OfferGalleryInternal: React.FC<IOfferGalleryProps> = ({images}) => (
  <div className="offer__gallery">
    {images.map((image) => (
      <div className="offer__image-wrapper" key={image}>
        <img className="offer__image" src={image} alt="Photo studio"/>
      </div>
    ))}
  </div>
);

export const OfferGallery = React.memo(OfferGalleryInternal);
OfferGallery.displayName = 'OfferGallery';
