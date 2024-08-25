import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Filter({
  className,
  columnName,
  columnIndex,
  options,
  filter,
  setFilter,
}) {
  // eslint-disable-next-line no-unused-vars
  function handleChange(event, value, reason) {
    // console.log(value);

    if (value.length !== 0) {
      setFilter({ ...filter, [columnIndex]: value });
      return;
    }

    const tmpFilter = filter;
    delete tmpFilter[columnIndex];

    setFilter({ ...tmpFilter });
  }

  return (
    <Autocomplete
      className={className}
      fullWidth
      multiple
      options={options}
      onChange={handleChange}
      disableCloseOnSelect
      getOptionLabel={option => String(option)}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" label={columnName} />
      )}
    />
  );
}

Filter.propTypes = {
  className: PropTypes.string,
  columnName: PropTypes.string.isRequired,
  columnIndex: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  filter: PropTypes.shape({}),
  setFilter: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  className: null,
  filter: {},
};

export default Filter;
