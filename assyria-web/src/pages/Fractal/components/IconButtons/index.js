import React from 'react';
import PropTypes from 'prop-types';

import ShowChartIcon from '@material-ui/icons/ShowChart';
import { withStyles } from '@material-ui/core/styles';

import { IconButton, Tooltip } from '@material-ui/core';

const styles = theme => ({
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  button: {
    // margin: theme.spacing.unit,
    marginTop: -20,
    marginBottom: -20,
  },
});

function IconButtons({ classes, onClick }) {
  return (
    <Tooltip title="Show chart" classes={{ tooltip: classes.lightTooltip }}>
      <IconButton
        onClick={onClick}
        className={classes.button}
        aria-label="Show chart"
      >
        <ShowChartIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    lightTooltip: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

IconButtons.defaultProps = {
  onClick: () => {},
};

export default withStyles(styles)(IconButtons);
