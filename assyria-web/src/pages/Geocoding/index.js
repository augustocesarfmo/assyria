/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '~/components/Table';
import ConfirmDialog from './components/ConfirmDialog';
import DialogImportXlsx from '~/components/DialogImportXlsx';
import RadioButtonsGroup from '~/components/RadioButtonsGroup';
import Backdrop from '~/components/BackdropComponent';

import { write, download, xl, sleep } from '~/services/xlsx';
import { geocoding, defaultObject } from '~/services/geocoding';
import dataExample from '~/tmp/dataExampleAddresses';

import { Container, Content, ButtonImportXlsx, TextProgress } from './styles';

function Geocoding({ pageName }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selected, setSelected] = useState(
    dataExample ? dataExample.address : null,
  ); // Handles the selected column of sheet
  const [value, setValue] = useState(null); // Handles the autocomplete input value of address/selection column
  const [identifier, setIdentifier] = useState(
    dataExample ? dataExample.identifier : null,
  ); // Record identifier
  const [file, setFile] = useState(null); // Metadata of attached file (.xlsx)
  const [data, setData] = useState(dataExample ? dataExample.data : []); // Stores as JSON format the data of .xlsx file
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * Fires when the file is removed.
   */
  function handleDeleteFile() {
    setFile(null);
    setSelected(null);
    setData([]);
    setIdentifier(null);
  }

  /**
   * Handles the changes on the input file.
   */
  function handleFileChange(e) {
    const tmpFile = e.target.files[0];
    setFile(tmpFile);
  }

  async function handleSubmit() {
    setLoading(true);
    setDialogVisible(false);

    const result = data.slice(1);

    const success = [];
    const failure = [];

    for (const [index, item] of result.entries()) {
      await sleep(200);

      // const percentage = ((index + 1) * 100) / result.length; // Percentage of total
      setProgress(index + 1);

      const prevData = {
        [data[0][identifier.id]]: item[identifier.id],
        [data[0][selected]]: item[selected],
      };

      try {
        const response = await geocoding(item[selected]);

        // console.log(item[selected]);
        success.push({ ...prevData, ...response });
      } catch (error) {
        // console.log(item[selected]);
        success.push({ ...prevData, ...defaultObject });
        failure.push({ ...prevData });
      }
    }

    // console.log(success);
    // console.log(failure);

    const wb = new xl.Workbook();

    write(wb, failure, 'failure');
    write(wb, success, 'success');

    const buffer = await wb.writeToBuffer();

    download(buffer, 'geocoding');
    setLoading(false);
    setProgress(0);
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
    setIdentifier(null);
  }, [file]);

  useEffect(() => {
    document.title = 'Geocoding | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Import your data sheet (.xlsx), select the address and identification
          columns to geocod the data set.
        </Typography>

        <ButtonImportXlsx
          file={file}
          handleFileChange={handleFileChange}
          handleDeleteFile={handleDeleteFile}
          setModalVisible={setModalVisible}
        />

        {data.length > 0 && (
          <Typography style={{ marginTop: 10 }}>
            <strong>{data.length - 1}</strong> data were recovered.
          </Typography>
        )}

        {data.length > 0 && (
          <>
            <Autocomplete
              clearOnEscape
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
                <TextField {...params} autoFocus label="Address" />
              )}
            />
            <FormHelperText margin="dense">
              Column that represents the address
            </FormHelperText>

            <Autocomplete
              clearOnEscape
              options={data[0].map((i, index) => ({ id: index, name: i }))}
              getOptionLabel={option => option.name}
              getOptionSelected={(option, tmpValue) =>
                option.name === tmpValue.name
              }
              value={identifier}
              onChange={(event, tmpValue) =>
                setIdentifier(
                  tmpValue
                    ? { id: tmpValue.id, name: data[0][tmpValue.id] }
                    : null,
                )
              }
              renderInput={params => (
                <TextField {...params} autoFocus label="Identifier" />
              )}
            />
            <FormHelperText margin="dense">
              Column that represents the record identifier
            </FormHelperText>
          </>
        )}

        <div id="web-submit-button">
          <Button
            disabled={
              selected === null || data.length === 0 || identifier === null
            }
            variant="outlined"
            color="primary"
            onClick={() => setDialogVisible(true)}
          >
            Submit
          </Button>
        </div>
      </Content>

      <Table
        header={
          data.length > 0 && selected !== null
            ? [data[0][selected]]
            : ['column']
        }
        rows={
          data.length > 0 && selected !== null
            ? data.slice(1, 30).map(i => i[selected])
            : ['File not yet attached or column not informed']
        }
      />

      <div id="mobile-submit-button">
        <Button
          disabled={
            selected === null || data.length === 0 || identifier === null
          }
          variant="outlined"
          color="primary"
          onClick={() => setDialogVisible(true)}
        >
          Submit
        </Button>
      </div>

      <ConfirmDialog
        open={dialogVisible}
        setOpen={setDialogVisible}
        handleSubmit={handleSubmit}
      />

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
          title="Address"
          row={false}
          options={data.length > 0 ? data[0] : []}
          helperText="Select the column that represents the address"
        />
      </DialogImportXlsx>

      <Backdrop open={loading}>
        <LinearProgress
          value={((progress + 1) * 100) / data.length - 1}
          variant="determinate"
          style={{ width: '35%' }}
        />
        <TextProgress variant="body2">
          {progress}/{data.length - 1}
        </TextProgress>
      </Backdrop>
    </Container>
  );
}

Geocoding.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Geocoding;
