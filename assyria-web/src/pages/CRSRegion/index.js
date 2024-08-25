import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CodeViewer from '~/components/CodeViewer';
import DialogImportXlsx from '~/components/DialogImportXlsx';
import RadioButtonsGroup from '~/components/RadioButtonsGroup';
import crs from './crs';

import { write, download, xl } from '~/services/xlsx';

import { Container, Content, ButtonImportXlsx } from './styles';

function CRSRegion({ pageName }) {
  const [counties, setCounties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]); // Stores as JSON format the data of .xlsx file
  const [selected, setSelected] = useState(null); // Handles the selected column of sheet
  const [value, setValue] = useState(null); // Handles the autocomplete column selection value
  const [file, setFile] = useState(null); // Metadata of attached file (.xlsx)

  useEffect(() => {
    document.title = 'CRS | Spatial Workspace';
  }, []);

  useEffect(() => {
    const tmpCounties = [];

    crs.forEach(i => {
      i.counties.forEach(j => {
        tmpCounties.push({ city: j, cd_crs: i.id, nm_crs: i.crs });
      });
    });

    setCounties(tmpCounties);
  }, []);

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

  async function handleSubmit() {
    const success = []; // Matrix with successes
    const failure = []; // Matrix with failures

    data.slice(1).forEach(i => {
      const found = counties.find(j => j.city === i[selected]);

      // Creates an object with the previous data of xlsx file
      const prevData = i.reduce((acc, curr, index) => {
        acc[data[0][index]] = curr;
        return acc;
      }, {});

      if (found) {
        const { cd_crs, nm_crs } = found;
        success.push({ ...prevData, cd_crs, nm_crs });
      } else {
        failure.push(prevData);
        success.push(prevData);
      }
    });

    const wb = new xl.Workbook();

    write(wb, failure, 'failure');
    write(wb, success, 'success');

    const buffer = await wb.writeToBuffer();

    download(buffer);
  }

  useEffect(() => {
    if (selected === null || data.length === 0) {
      setValue(null);
      return;
    }

    setValue({ id: selected, name: data[0][selected] });
  }, [selected, data]);

  useEffect(() => {
    setSelected(null);
    setValue(null);
  }, [data]);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Import your data sheet (.xlsx) and select the &quot;city&quot; column
          to associate your respective Coordenadoria Regional de Saúde of Rio
          Grande do Sul.
        </Typography>

        <Typography style={{ marginTop: 15 }}>
          <strong>{counties.length}</strong> municipalities were recovered from
          <strong> Rio Grande do Sul</strong> with their Coordenadorias
          Regionais de Saúde.
        </Typography>

        <ButtonImportXlsx
          file={file}
          handleFileChange={handleFileChange}
          handleDeleteFile={handleDeleteFile}
          setModalVisible={setModalVisible}
        />

        {data.length > 0 && file && (
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
            disabled={selected === null || !file}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Content>

      <div id="mobile-margin-codeviewer" />
      <CodeViewer
        language="json"
        code={JSON.stringify(
          window.innerWidth < 960 ? crs.slice(0, 1) : crs,
          null,
          2,
        )}
      />

      <div id="mobile-submit-button">
        <Button
          disabled={selected === null || !file}
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
    </Container>
  );
}

CRSRegion.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default CRSRegion;
