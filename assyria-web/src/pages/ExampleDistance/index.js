import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import MapComponent from '~/components/MapComponent';
import { distance } from '~/services/fractal';

import { Container, Content, Form, Info, FormControl } from './styles';

function ExampleDistance({ pageName }) {
  const [origin, setOrigin] = useState({
    lat: -28.9318491,
    lng: -51.55018399,
  });
  const [destination, setDestination] = useState({
    lat: -27.8629644,
    lng: -54.4464158,
  });

  const [value, setValue] = useState(distance({ origin, destination }));
  const R = 6371.0; // Earth's degrees - used to transform the calculated distance to meters

  const [change, setChange] = useState(false); // Handles the clicks on the map

  useEffect(() => {
    setValue(distance({ origin, destination }));
  }, [origin, destination]);

  function handleClickMap(event) {
    const { lat, lng } = event.latLng;
    setChange(!change);

    if (change) {
      setOrigin({ lat: lat(), lng: lng() });
      return;
    }

    setDestination({ lat: lat(), lng: lng() });
  }

  useEffect(() => {
    document.title = 'Distance | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Click on the map to change the position of the markers. The angular
          distance between the two points is automatically calculated.
        </Typography>

        <Form>
          <FormControl component="fieldset">
            <FormLabel component="legend">Origin</FormLabel>

            <TextField
              onChange={event =>
                setOrigin({ ...origin, lat: Number(event.target.value) })
              }
              value={origin.lat}
              id="filled-basic"
              type="number"
              label="Latitude"
              variant="filled"
            />
            <TextField
              onChange={event =>
                setOrigin({ ...origin, lng: Number(event.target.value) })
              }
              value={origin.lng}
              id="filled-basic"
              type="number"
              label="Longitude"
              variant="filled"
            />
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Destination</FormLabel>

            <TextField
              onChange={event =>
                setDestination({
                  ...destination,
                  lat: Number(event.target.value),
                })
              }
              value={destination.lat}
              id="filled-basic"
              type="number"
              label="Latitude"
              variant="filled"
            />
            <TextField
              onChange={event =>
                setDestination({
                  ...destination,
                  lng: Number(event.target.value),
                })
              }
              value={destination.lng}
              id="filled-basic"
              type="number"
              label="Longitude"
              variant="filled"
            />
          </FormControl>
        </Form>

        <Info>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <p>
              <strong>{(value * R).toFixed(2)}</strong> km of distance.
            </p>
            <p>
              And the angular distance is{' '}
              <strong>{Number(value).toFixed(5)}</strong>.
            </p>
          </Alert>
        </Info>
      </Content>

      <MapComponent
        polyline
        onClick={handleClickMap}
        markers={[origin, destination]}
      />
    </Container>
  );
}

ExampleDistance.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default ExampleDistance;
