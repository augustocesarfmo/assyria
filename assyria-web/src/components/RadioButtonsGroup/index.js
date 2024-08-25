import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup({
  value,
  handleChange,
  title,
  row,
  options,
  helperText,
}) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        row={row}
        aria-label={title}
        name={title}
        value={value}
        onChange={e => handleChange(Number(e.target.value))}
      >
        {options.map((i, index) => (
          <FormControlLabel
            // eslint-disable-next-line react/no-array-index-key
            key={`radio-${index}`}
            value={index}
            control={<Radio />}
            label={i}
          />
        ))}
      </RadioGroup>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

RadioButtonsGroup.propTypes = {
  value: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  row: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  helperText: PropTypes.string,
};

RadioButtonsGroup.defaultProps = {
  value: 0,
  row: true,
  helperText: null,
};
