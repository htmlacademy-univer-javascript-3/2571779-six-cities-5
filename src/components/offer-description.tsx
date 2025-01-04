import React, {useState} from 'react';
import {RatingStars} from './rating-stars.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../app-route.ts';
import {changeFavoriteStatusAction} from '../store/api-actions.ts';
import {useAppDispatch} from '../hooks/use-app-dispatch.ts';
import {OfferShortInfo} from '../models/offer-short-info.ts';
import {useAppSelector} from '../hooks/use-app-selector';
import {getAuthStatus} from '../store/user-data/user-data.selectors';
import {AuthorizationStatus} from '../shared/const';

interface IOfferDescriptionProps {
  offer: OfferShortInfo;
}

export const OfferDescription: React.FC<IOfferDescriptionProps> = ({offer}) => {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  function handleFavoriteClick() {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(changeFavoriteStatusAction({offer: offer, status: !isFavorite}));
      setIsFavorite(!isFavorite);
    } else {
      navigate(AppRoute.Login);
    }
  }

  return (
    <>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button
          className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
          type="button"
          onClick={handleFavoriteClick}
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <RatingStars rating={offer.rating}/>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={AppRoute.Offer.CreateOne(offer.id)}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </>
  );
};
