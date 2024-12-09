import React, {useEffect} from 'react';
import {OfferGallery} from './components/offer-gallery.tsx';
import {RatingStars} from '../../components/rating-stars.tsx';
import {OfferFeatures} from './components/offer-features.tsx';
import {OfferInside} from './components/offer-inside.tsx';
import {OfferDescription} from './components/offer-description.tsx';
import {OfferReviews} from './components/offer-reviews.tsx';
import {OfferPrice} from './components/offer-price.tsx';
import {NearPlaceCard} from './components/near-place-card.tsx';
import {Map} from '../../components/map.tsx';
import {Header} from '../../components/header.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {useParams} from 'react-router-dom';
import {changeFavoriteStatusAction, fetchFullOfferInfoAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {setFullOfferInfo} from '../../store/action.ts';


export const OfferPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offerFullInfo);
  const offerShortInfo = useAppSelector((state) => state.offersViewList.find((o) => o.id === offer?.id) ?? null);
  const isFavorite = offer?.isFavorite ?? false;
  const nearOffers = useAppSelector((state) => state.nearbyOffers);
  const comments = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (id) {
      dispatch(fetchFullOfferInfoAction(id));
    }
  }, [dispatch, id]);

  if (!offer) {
    return <Spinner/>;
  }

  function handleFavoriteClick() {
    dispatch(changeFavoriteStatusAction({offer: offerShortInfo!, status: !isFavorite}));

    if (!offer) {
      return;
    }
    const updatedOffer = {...offer, isFavorite: !isFavorite};
    dispatch(setFullOfferInfo({offer: updatedOffer}));
  }

  return (
    <div className="page">
      <Header addNavigation/>

      <main className="page__main page__main--offer">
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
              <OfferReviews comments={comments}/>
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
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((nearOffer) => (
                <NearPlaceCard offer={nearOffer} key={nearOffer.id}/>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

