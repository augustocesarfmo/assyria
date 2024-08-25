import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import { Container } from './styles';

import axios from '~/services/api';

function InputLocalesIBGE({ setCounties, counties }) {
  const [state, setState] = useState({ id: 43, nome: 'Rio Grande do Sul' });
  const [ufs, setUfs] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Loads the counties of a Brazil state from the IBGE API.
   */
  const loadCounties = useCallback(async () => {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/municipios`,
    );

    setCounties(data);
  }, [state, setCounties]);

  useEffect(() => {
    if (!state) {
      setCounties([]);
      return;
    }

    loadCounties();
  }, [state, loadCounties, setCounties]);

  useEffect(() => {
    loadUfs();
  }, []);

  /**
   * Loads the federative units (UF) of Brazil from the IBGE API.
   */
  async function loadUfs() {
    setLoading(true);

    // await sleep(1e3);
    try {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );

      setUfs(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Autocomplete
        loading={loading}
        options={ufs}
        getOptionLabel={option => option.nome}
        getOptionSelected={(option, value) => option.nome === value.nome}
        onChange={(event, value) => setState(value)}
        value={state}
        renderInput={params => (
          <TextField
            {...params}
            autoFocus
            label="Select the UF"
            placeholder="Rio Grande do Sul"
          />
        )}
      />
      <FormHelperText margin="dense">
        You can also type to filter other options
      </FormHelperText>

      <Typography>
        {state ? (
          <>
            <strong>{counties.length}</strong> municipalities were recovered
            from <strong>{state.nome}</strong>.
          </>
        ) : (
          <>No options were selected.</>
        )}
      </Typography>
    </Container>
  );
}

InputLocalesIBGE.propTypes = {
  setCounties: PropTypes.func.isRequired,
  counties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default InputLocalesIBGE;
