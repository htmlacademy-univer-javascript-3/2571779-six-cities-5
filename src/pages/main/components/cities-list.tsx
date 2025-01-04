import React from 'react';
import {City} from '../../../models/city.ts';
import {useAppDispatch} from '../../../hooks/use-app-dispatch.ts';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';
import {getCurrentCity} from '../../../store/navigation-data/navigation-data.selectors';
import {setActiveCity} from '../../../store/navigation-data/navigation-data.slice';

interface ICitiesListProps {
  cities: City[];
}

export const CitiesList: React.FC<ICitiesListProps> = ({cities}) => {
  const activeCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  function onCityClick(city: City) {
    dispatch(setActiveCity({city}));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={`locations__item-link tabs__item ${city.name === activeCity.name ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={() => onCityClick(city)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
