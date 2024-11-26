import 'leaflet/dist/leaflet.css';
import leaflet, {Marker} from 'leaflet';
import React, {useRef, useEffect} from 'react';
import {City} from '../models/city.ts';
import {useMap} from '../hooks/use-map.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../shared/const.ts';
import {OfferBase} from '../models/offer-base.ts';

interface MapProps {
  city: City;
  offersLocation: OfferBase[];
  activeLocationId?: string;
}

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const Map: React.FC<MapProps> = ({city, offersLocation, activeLocationId}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      offersLocation.forEach((offer) => {
        const marker = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeLocationId)
              ? currentCustomIcon
              : defaultCustomIcon
          })
          .addTo(map);

        markers.push(marker);
      });
    }

    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, city, offersLocation, activeLocationId]);

  return <section className="cities__map" style={{height: '100%'}} ref={mapRef}/>;
};
