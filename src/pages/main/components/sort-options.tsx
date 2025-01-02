import React, {useState} from 'react';
import {useAppDispatch} from '../../../hooks/use-app-dispatch.ts';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import {SortOption} from '../shared/sort-option.ts';
import {getSortOption} from "../../../store/navigation-data/navigation-data.selectors";
import {setSortOption} from "../../../store/navigation-data/navigation-data.slice";

export const SortOptions: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const dispatch = useAppDispatch();
  const sortOption = useAppSelector(getSortOption);

  function onSortChosen(option: SortOption) {
    setIsOpened(false);
    dispatch(setSortOption({option: option}));
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {sortOption.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened && (
        <ul className="places__options places__options--custom places__options--opened">
          {SortOption.WithDefaultOptions().map((option) => (
            <li
              className={`places__option ${option.name === sortOption.name ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={option.name}
              onClick={() => onSortChosen(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
