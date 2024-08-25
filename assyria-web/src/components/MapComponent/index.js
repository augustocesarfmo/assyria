import React from 'react';
import PropTypes from 'prop-types';

import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from '@react-google-maps/api';
import geocoder from '~/config/geocoder';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -15.7217175,
  lng: -48.0774438,
};

export default function MapComponent({ onClick, polyline, markers, zoom }) {
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: markers,
    zIndex: 1,
  };

  return (
    <LoadScript loadingElement={<p />} googleMapsApiKey={geocoder.apiKey}>
      <GoogleMap
        onClick={onClick}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {markers.map((coord, index) => (
          <Marker key={String(index)} position={coord} />
        ))}

        {polyline && <Polyline path={markers} options={options} />}
      </GoogleMap>
    </LoadScript>
  );
}

MapComponent.propTypes = {
  onClick: PropTypes.func,
  polyline: PropTypes.bool,
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  zoom: PropTypes.number,
};

MapComponent.defaultProps = {
  onClick: null,
  polyline: false,
  markers: [],
  zoom: 4,
};
