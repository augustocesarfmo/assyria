import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { Container } from './styles';

function PageName({ children, className }) {
  return (
    <Container className={className}>
      <Typography variant="h6">{children}</Typography>
    </Container>
  );
}

PageName.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PageName;
