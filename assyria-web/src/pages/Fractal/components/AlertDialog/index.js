import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import Plot from 'react-plotly.js';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function AlertDialog({ open, setOpen, data, setData }) {
  const handleClose = () => {
    setOpen(false);
    setData({});
  };

  return (
    <Dialog
      maxWidth={false}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" onClose={handleClose}>
        {data.dialogTitle}
      </DialogTitle>

      <DialogContent>
        <Plot
          divId="plotly_div"
          data={data.values}
          layout={{
            title: { text: data.graphTitle, yanchor: 'top' }, // more about "layout.title": #layout-title
            xaxis: {
              // all "layout.xaxis" attributes: #layout-xaxis
              zeroline: false,
              borderwidth: 0,
              linewidth: 1,
              gridcolor: '#fff',

              ...data.xaxis,
            },
            yaxis: {
              // all "layout.xaxis" attributes: #layout-xaxis
              zeroline: false,
              linewidth: 1,
              gridcolor: '#fff',
              automargin: true,

              ...data.yaxis,
            },
            annotations: data.annotations,
            plot_bgcolor: '#ebebeb',
            ...data.layout,
          }}
          config={{
            toImageButtonOptions: {
              format: 'png', // one of png, svg, jpeg, webp
              filename: data.graphTitle,
              scale: 10, // Multiply title/legend/axis/canvas sizes by this factor
            },
          }}
        />

        {/* <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.object),
    dialogTitle: PropTypes.string,
    graphTitle: PropTypes.string,
    xaxis: PropTypes.shape({}),
    yaxis: PropTypes.shape({}),
    annotations: PropTypes.arrayOf(PropTypes.object),
    layout: PropTypes.shape({}),
  }),
  setData: PropTypes.func.isRequired,
};

AlertDialog.defaultProps = {
  data: {
    annotations: {},
    layout: {},
  },
};

export default AlertDialog;
