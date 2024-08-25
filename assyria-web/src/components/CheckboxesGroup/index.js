import React from 'react';
import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxesGroup({ setState, title, options }) {
  const handleChange = event => {
    setState({ ...options, [event.target.name]: event.target.checked });
  };

  const error = Object.values(options).filter(v => v).length !== 2;

  return (
    <FormControl required error={error} component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <FormGroup>
        {Object.keys(options).map(
          (i, index) =>
            i !== '' && (
              <FormControlLabel
                key={String(`${index}-${i}`)}
                control={
                  <Checkbox
                    checked={options[i]}
                    onChange={handleChange}
                    name={i}
                  />
                }
                label={i || '*'}
              />
            ),
        )}
      </FormGroup>
      {error && (
        <FormHelperText>Only two options can be checked</FormHelperText>
      )}
    </FormControl>
  );
}

CheckboxesGroup.propTypes = {
  setState: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
};
