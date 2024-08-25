import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLacalesIBGE from '~/components/InputLocalesIBGE';
import CodeViewer from '~/components/CodeViewer';

import { Container, Content } from './styles';

function SearchRegion({ pageName }) {
  const [counties, setCounties] = useState([]);
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (!city) return;
    // console.log(city);

    const result = counties.find(i => i.nome === city);

    setSearch(result || {});
  }, [city, counties]);

  useEffect(() => {
    document.title = 'Search | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Filter a city from a specific Federation Unit (UF), Brazil, and view
          its respective regions.
        </Typography>

        <InputLacalesIBGE setCounties={setCounties} counties={counties} />

        <Autocomplete
          id="free-solo-demo"
          options={counties.map(option => option.nome)}
          onChange={(event, value) => setCity(value)}
          value={city}
          renderInput={params => (
            <TextField
              {...params}
              label="City"
              placeholder="Viamão"
              autoFocus
              variant="filled"
            />
          )}
        />
        <FormHelperText margin="dense">
          You can also type to filter other options
        </FormHelperText>
      </Content>

      <CodeViewer
        language="json"
        code={JSON.stringify(city ? search : counties.slice(0, 2), null, 2)}
      />
    </Container>
  );
}

SearchRegion.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default SearchRegion;
