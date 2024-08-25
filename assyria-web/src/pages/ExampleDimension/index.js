import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import Typography from '@material-ui/core/Typography';
import MapComponent from '~/components/MapComponent';
import { dimension } from '~/services/fractal';

import { Container, Content, InputSlider, Chip } from './styles';

function ExampleDimension({ pageName }) {
  const [markers, setMarkers] = useState([]);
  const [rDistance, setrDistance] = useState(0.00157); // Fractal r distance (degrees)
  const [value, setValue] = useState(0); // Value of dimension

  const handleChange = useCallback(() => {
    setValue(dimension({ markers, rDistance }));
  }, [markers, rDistance]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);

  function handleClickMap(event) {
    const { lat, lng } = event.latLng;

    setMarkers([...markers, { lat: lat(), lng: lng() }]);
  }

  useEffect(() => {
    document.title = 'Dimension | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Click on the map to drop <i>n</i> event points. The fractal dimension
          is automatically calculated.
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend">Number of points on the map</FormLabel>

          <Chip
            clickable={false}
            icon={<PinDropTwoToneIcon fontSize="small" />}
            label={`${markers.length} event points`}
            onDelete={markers.length > 0 ? () => setMarkers([]) : null}
            variant={markers.length > 0 ? 'default' : 'outlined'}
          />
        </FormControl>

        <Typography gutterBottom color="textSecondary">
          Fractal dimension value
        </Typography>

        <Typography variant="body2" color="textPrimary">
          The value is <strong>{String(value)}</strong>
        </Typography>

        <InputSlider setrDistance={setrDistance} />
      </Content>

      <MapComponent onClick={handleClickMap} markers={markers} zoom={8} />
    </Container>
  );
}

ExampleDimension.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default ExampleDimension;
