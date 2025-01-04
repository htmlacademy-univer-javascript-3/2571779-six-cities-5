import React, {useEffect} from 'react';
import {OfferGallery} from './components/offer-gallery.tsx';
import {RatingStars} from '../../components/rating-stars.tsx';
import {OfferFeatures} from './components/offer-features.tsx';
import {OfferInside} from './components/offer-inside.tsx';
import {OfferDescription} from './components/offer-description.tsx';
import {OfferReviews} from './components/offer-reviews.tsx';
import {OfferPrice} from './components/offer-price.tsx';
import {Map} from '../../components/map.tsx';
import {Header} from '../../components/header.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {changeFavoriteStatusAction, fetchFullOfferInfoAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {
  getIsDataLoaded,
  getNearbyOffers,
  getOfferComments,
  getOfferFullInfo
} from '../../store/offer-info/offer-info.selectors';
import {getOfferShortInfo} from '../../store/offers-data/offers-data.selectors';
import {setFullOfferInfo} from '../../store/offer-info/offer-info.slice';
import {AppRoute} from '../../app-route';
import {getAuthStatus} from '../../store/user-data/user-data.selectors';
import {AuthorizationStatus} from '../../shared/const';
import {NearPlaceCards} from './components/near-place-cards';

export const OfferPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOfferFullInfo);
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const offerShortInfo = useAppSelector((state) => getOfferShortInfo(state, offer?.id ?? ''));
  const isFavorite = offer?.isFavorite ?? false;
  const nearOffers = useAppSelector(getNearbyOffers);
  const comments = useAppSelector(getOfferComments);

  useEffect(() => {
    if (id) {
      dispatch(fetchFullOfferInfoAction(id))
        .unwrap()
        .catch(() => {
          navigate(AppRoute.NotFound);
        });
    }
  }, [dispatch, id]);

  function handleFavoriteClick() {
    if (authStatus === AuthorizationStatus.Auth) {
      if (!offer) {
        return;
      }

      dispatch(changeFavoriteStatusAction({offer: offerShortInfo!, status: !isFavorite}));
      const updatedOffer = {...offer, isFavorite: !isFavorite};
      dispatch(setFullOfferInfo({offer: updatedOffer}));
    } else {
      navigate(AppRoute.Login);
    }
  }

  return (
    <div className="page">
      <Header addNavigation/>

      <main className="page__main page__main--offer">
        {isDataLoaded && offer && (
          <>
            <section className="offer">
              <div className="offer__gallery-container container">
                <OfferGallery images={offer.images}/>
              </div>
              <div className="offer__container container">
                <div className="offer__wrapper">
                  {offer.isPremium && (
                    <div className="offer__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="offer__name-wrapper">
                    <h1 className="offer__name">{offer.title}</h1>
                    <button
                      className={`offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                      type="button"
                      onClick={handleFavoriteClick}
                    >
                      <svg className="offer__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="offer__rating rating">
                    <div className="offer__stars rating__stars">
                      <RatingStars rating={offer.rating}/>
                    </div>
                    <span className="offer__rating-value rating__value">{offer.rating}</span>
                  </div>
                  <OfferFeatures type={offer.type} maxAdults={offer.maxAdults} bedroomsCount={offer.bedrooms}/>
                  <OfferPrice price={offer.price}/>
                  <OfferInside goods={offer.goods}/>
                  <OfferDescription offer={offer}/>
                  <OfferReviews comments={comments} offerId={offer.id}/>
                </div>
              </div>
              <div style={{height: '550px', width: '1100px', margin: 'auto'}}>
                <Map
                  city={offer.city}
                  offersLocation={[...nearOffers, offer]}
                  activeLocationId={offer.id}
                />
              </div>
            </section>
            <NearPlaceCards offers={nearOffers}/>
          </>
        )}
        {!isDataLoaded && <Spinner/>}
      </main>
    </div>
  );
};

