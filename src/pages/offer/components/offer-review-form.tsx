import React, {useState} from 'react';
import {useAppDispatch} from '../../../hooks/use-app-dispatch.ts';
import {postCommentAction} from '../../../store/api-actions.ts';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import {getOfferFullInfo} from "../../../store/offer-info/offer-info.selectors";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "../../../app-route";

interface IOfferReviewFormProps {
}

const POSSIBLE_RATING_VALUES: [number, string][] = [
  [5, 'perfect'],
  [4, 'good'],
  [3, 'not bad'],
  [2, 'badly'],
  [1, 'terribly']
];

export const OfferReviewForm: React.FC<IOfferReviewFormProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offer = useAppSelector(getOfferFullInfo);
  const [formData, setFormData] = useState({rating: '0', review: ''});

  function onCommentChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = evt.currentTarget;
    setFormData({...formData, [name]: value});
  }

  function onFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const {rating, review} = formData;

    if (!offer) {
      return;
    }

    dispatch(postCommentAction({offerId: offer?.id, comment: review, rating: Number(rating)}))
      .then(() => {
        setFormData({rating: '', review: ''});
      });
  }

  const isSubmitDisabled = formData.rating === '0' || formData.review.length < 50;

  if (!offer) {
    navigate(AppRoute.NotFound)
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {POSSIBLE_RATING_VALUES.map((value) => (
          <React.Fragment key={value[0]}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value[0]}
              id={`${value[0]}-stars`}
              type="radio"
              onChange={onCommentChange}
            />
            <label
              htmlFor={`${value[0]}-stars`}
              className="reviews__rating-label form__rating-label"
              title={value[1]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={onCommentChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit
        </button>
      </div>
    </form>
  );
};
