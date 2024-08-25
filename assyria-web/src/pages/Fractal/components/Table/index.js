/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '~/pages/Cases/components/Table';

function SimpleTable({
  tableTitle,
  header,
  rows,
  getCrVersusLogrGraphic,
  getDcVersusLogrGraphic,
}) {
  return (
    <Paper elevation={0}>
      {header.length > 0 && tableTitle !== 'Table' && (
        <>
          <Toolbar style={{ paddingLeft: 16, paddingRight: 6 }}>
            <Typography variant="h6" component="div">
              Graphics
            </Typography>
          </Toolbar>

          <ButtonGroup
            color="primary"
            variant="text"
            aria-label="text primary button group"
            fullWidth
            disableElevation
            style={{ paddingBottom: 10 }}
          >
            <Button onClick={getCrVersusLogrGraphic}>C(r) versus log(r)</Button>

            <Button onClick={getDcVersusLogrGraphic}>Dc versus log(r)</Button>
          </ButtonGroup>

          <Divider />
        </>
      )}

      <Table rows={rows} header={header} tableTitle={tableTitle} />
    </Paper>
  );
}

SimpleTable.propTypes = {
  tableTitle: PropTypes.string.isRequired,
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
  getCrVersusLogrGraphic: PropTypes.func.isRequired,
  getDcVersusLogrGraphic: PropTypes.func.isRequired,
};

export default SimpleTable;
