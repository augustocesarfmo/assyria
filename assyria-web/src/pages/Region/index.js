import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Backdrop from '~/components/BackdropComponent';
import CodeViewer from '~/components/CodeViewer';
import DialogImportXlsx from '~/components/DialogImportXlsx';
import RadioButtonsGroup from '~/components/RadioButtonsGroup';
import InputLocalesIBGE from '~/components/InputLocalesIBGE';
import { write, download, xl } from '~/services/xlsx';

import { Container, Content, ButtonImportXlsx } from './styles';

import dataExample from '~/tmp/dataExampleGeocoding';

function Region({ pageName }) {
  const [counties, setCounties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(dataExample ? dataExample.data : []); // Stores as JSON format the data of .xlsx file
  const [selected, setSelected] = useState(
    dataExample ? dataExample.cityColumn : null,
  ); // Handles the selected column of sheet
  const [value, setValue] = useState(null); // Handles the autocomplete input value of selection column
  const [file, setFile] = useState(null); // Metadata of attached file (.xlsx)
  const [loading, setLoading] = useState(false);

  /**
   * Fires when the file is removed.
   */
  function handleDeleteFile() {
    setFile(null);
    setSelected(null);
    setData([]);
    setValue(null);
  }

  /**
   * Handles the changes on the input file.
   */
  function handleFileChange(e) {
    const tmpFile = e.target.files[0];
    setFile(tmpFile);
  }

  /**
   * Returns object from IBGE regions of a specific city.
   * @param {Object} object Object of IBGE regions.
   */
  function regions(object) {
    const { id, microrregiao } = object;
    const { mesorregiao } = object.microrregiao;

    return {
      cd_mun: id, // Code of city
      cd_micro: microrregiao.id, // Code of microregion
      nm_micro: microrregiao.nome, // Name of microregion
      cd_meso: mesorregiao.id, // Code of mesoregion
      nm_meso: mesorregiao.nome, // Name of mesoregion
    };
  }

  async function handleSubmit() {
    setLoading(true);

    const success = []; // Matrix with successes
    const failure = []; // Matrix with failures

    data.slice(1).forEach(i => {
      const found = counties.find(j => j.nome === i[selected]);

      // Creates an object with the previous data of xlsx file
      const prevData = i.reduce((acc, curr, index) => {
        acc[data[0][index]] = curr;
        return acc;
      }, {});

      if (found) {
        success.push({ ...prevData, ...regions(found) });
      } else {
        failure.push(prevData);
        success.push(prevData);
      }
    });

    const wb = new xl.Workbook();

    write(wb, failure, 'failure');
    write(wb, success, 'success');

    const buffer = await wb.writeToBuffer();

    setLoading(false);
    download(buffer, 'regions');
  }

  useEffect(() => {
    if (selected === null || data.length === 0) {
      setValue(null);
      return;
    }

    setValue({ id: selected, name: data[0][selected] });
  }, [selected, data]);

  useEffect(() => {
    if (!file) return;

    setSelected(null);
    setValue(null);
  }, [file]);

  useEffect(() => {
    document.title = 'Region | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Import your data sheet (.xlsx) and select the &quot;city&quot; column
          to associate your respective IBGE regions.
        </Typography>

        <InputLocalesIBGE setCounties={setCounties} counties={counties} />

        <ButtonImportXlsx
          file={file}
          handleFileChange={handleFileChange}
          handleDeleteFile={handleDeleteFile}
          setModalVisible={setModalVisible}
        />

        {data.length > 0 && (
          <>
            <Autocomplete
              options={data[0].map((i, index) => ({ id: index, name: i }))}
              getOptionLabel={option => option.name}
              getOptionSelected={(option, tmpValue) =>
                option.name === tmpValue.name
              }
              value={value}
              onChange={(event, tmpValue) =>
                setSelected(tmpValue ? tmpValue.id : null)
              }
              renderInput={params => (
                <TextField {...params} autoFocus label="City" />
              )}
            />
            <FormHelperText margin="dense">
              Select the column that represents the city name
            </FormHelperText>
          </>
        )}

        <div id="web-submit-button">
          <Button
            disabled={selected === null || data.length === 0}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Content>

      <CodeViewer
        language="json"
        code={JSON.stringify(counties.slice(0, 2), null, 2)}
      />

      <div id="mobile-submit-button">
        <Button
          disabled={selected === null || data.length === 0}
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <DialogImportXlsx
        file={file}
        setFile={setFile}
        setData={setData}
        open={modalVisible}
        setOpen={setModalVisible}
      >
        <RadioButtonsGroup
          value={selected}
          handleChange={setSelected}
          title="City"
          row={false}
          options={data.length > 0 ? data[0] : []}
          helperText="Select the column that represents the city name"
        />
      </DialogImportXlsx>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

Region.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Region;
