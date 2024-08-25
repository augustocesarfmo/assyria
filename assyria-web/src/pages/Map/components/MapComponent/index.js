import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  KmlLayer,
} from '@react-google-maps/api';
import geocoder from '~/config/geocoder';

import { InfoContainer } from './styles';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -15.7217175,
  lng: -48.0774438,
};

export default function MapComponent({ data, zoom, kmlLayer }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const { markers, header } = data;

  const handleActiveMarker = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = map => {
    if (!markers.length) return;

    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();

    markers.forEach(({ position }) => {
      if (!position.lat && !position.lng) return;
      bounds.extend(position);
    });

    // Fits the map to the markers
    map.fitBounds(bounds);
  };

  return (
    <LoadScript loadingElement={<p />} googleMapsApiKey={geocoder.apiKey}>
      <GoogleMap
        onClick={() => setActiveMarker(null)}
        onLoad={handleOnLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        id="map"
      >
        {markers.map(({ position, info, id }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <InfoContainer>
                  <h2>Informations</h2>
                  {info.map((item, index) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={`info-${index}`}>
                        <strong>{header[index]}</strong>: <span>{item}</span>
                      </div>
                    );
                  })}

                  <div>
                    <strong>latitude</strong>: <span>{position.lat}</span>
                  </div>

                  <div>
                    <strong>longitude</strong>: <span>{position.lng}</span>
                  </div>
                </InfoContainer>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}

        {/* sample: https://drive.google.com/uc?export=download&id=1E_ux_XUWPoyWiduWKcRH-tWdPa21mdg3 */}
        {kmlLayer && (
          <KmlLayer url="https://drive.google.com/uc?export=download&id=1E_ux_XUWPoyWiduWKcRH-tWdPa21mdg3" />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

MapComponent.propTypes = {
  data: PropTypes.shape({
    markers: PropTypes.arrayOf(PropTypes.shape({})),
    header: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  zoom: PropTypes.number,
  kmlLayer: PropTypes.bool,
};

MapComponent.defaultProps = {
  zoom: 4,
  kmlLayer: false,
};
