/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function SimpleTable({ tableTitle, header, rows }) {
  return (
    <Paper elevation={0}>
      <Toolbar style={{ paddingLeft: 16, paddingRight: 6 }}>
        <Typography variant="h6" id="tableTitle" component="div">
          {tableTitle}
        </Typography>
      </Toolbar>

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((i, index) => (
                <TableCell key={`header-${index}`}>{i}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((column, j) => (
                  <TableCell
                    key={`body-${index}${j}`}
                    component="th"
                    scope="row"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

SimpleTable.propTypes = {
  tableTitle: PropTypes.string,
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

SimpleTable.defaultProps = {
  tableTitle: 'Table',
};

export default SimpleTable;
