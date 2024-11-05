import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {City} from '../models/city.ts';
import leaflet from 'leaflet';

export const useMap = (mapRef: MutableRefObject<HTMLElement | null>, city: City): leaflet.Map | null => {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current === null || isRenderedRef.current) {
      return;
    }

    const instance = leaflet.map(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });

    leaflet
      .tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'})
      .addTo(instance);

    setMap(instance);
    isRenderedRef.current = true;
  }, [mapRef, map, city]);

  return map;
};
