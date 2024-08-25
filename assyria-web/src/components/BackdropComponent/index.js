import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function BackdropComponent({ children, open }) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      {children}
    </Backdrop>
  );
}

BackdropComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool.isRequired,
};

export default BackdropComponent;
