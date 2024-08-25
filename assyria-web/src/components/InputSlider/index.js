import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider from '@material-ui/core/Slider';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Container, Info, InputNumber } from './styles';

function InputSlider({ className, setrDistance }) {
  const [value, setValue] = useState(10); // Km distance
  const R = 6371e3; // Earth's degrees - used to transform the calculated distance to meters

  useEffect(() => {
    setrDistance(((value * 1000) / R).toFixed(5)); // Converts km in degrees distance
  });

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <Container className={className}>
      <Typography color="textSecondary" id="input-slider" gutterBottom>
        Kilometers
      </Typography>
      <Slider
        defaultValue={value}
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        step={1}
        marks
        min={0}
        max={100}
      />

      <FormHelperText>
        Move the input slider to change the km value
      </FormHelperText>

      <Info>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          <InputNumber
            value={value}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 2000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          km of distance.
          <p>
            And the angular distance is{' '}
            <strong>{((value * 1000) / R).toFixed(5)}</strong>.
          </p>
        </Alert>
      </Info>
    </Container>
  );
}

InputSlider.propTypes = {
  className: PropTypes.string,
  setrDistance: PropTypes.func.isRequired,
};

InputSlider.defaultProps = {
  className: null,
};

export default InputSlider;
