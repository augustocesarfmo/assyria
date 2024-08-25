import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import CodeViewer from '~/components/CodeViewer';
import Backdrop from '~/components/BackdropComponent';

import { geocoding } from '~/services/geocoding';

import { Container, Content } from './styles';

function ExampleGeocoding({ pageName }) {
  const [address, setAddress] = useState(
    'Rua Monteiro Lobato, 420, Centro, Bom Conselho, Pernambuco',
  );
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    try {
      const response = await geocoding(address);

      setData(response);
    } catch (error) {
      setData({ message: 'Location not found' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = 'Address | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Enter your full address and click the submit button to view an example
          of the geocoding process.
        </Typography>

        <div id="text-input">
          <TextField
            label="Address"
            placeholder="Type your full address here"
            fullWidth
            multiline
            variant="filled"
            autoFocus
            value={address}
            onChange={event => setAddress(event.target.value)}
          />

          <Button
            id="mobile-submit-button"
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            <SearchIcon />
          </Button>
        </div>

        <div id="web-submit-button">
          <Button
            disabled={!address || loading}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Content>

      <CodeViewer code={JSON.stringify(data, null, 2)} language="json" />

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

ExampleGeocoding.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default ExampleGeocoding;
