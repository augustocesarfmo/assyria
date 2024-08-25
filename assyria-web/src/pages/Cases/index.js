import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Table from './components/Table';
import DialogImportXlsx from '~/components/DialogImportXlsx';
import RadioButtonsGroup from '~/components/RadioButtonsGroup';

import dataExample from '~/tmp/dataExampleIBGE';
import { write, download, xl } from '~/services/xlsx';
import { getColumnData } from '~/services/coordinates';

import { Container, Content, Filter, ButtonImportXlsx } from './styles';

function Cases({ pageName }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState(null); // Metadata of attached file (.xlsx)
  const [data, setData] = useState(dataExample ? dataExample.data : []); // Stores as JSON format the data of .xlsx file
  const [region, setRegion] = useState(dataExample ? dataExample.region : null); // Index of selected area of interest
  const [value, setValue] = useState(null); // Handles the autocomplete column selection value
  const [filter, setFilter] = useState(null); // Stores the values of filtered options
  const [counters, setCounters] = useState([]); // Handles the number of cases per region

  /**
   * Fires when the file is removed.
   */
  function handleDeleteFile() {
    setFile(null);
    setRegion(null);
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

  const handleChanges = useCallback(() => {
    // Regions not repeated for use in the first filter
    const regions = getColumnData(data, region);

    // Separates data sets by region
    let result = regions.map(i =>
      data.slice(1).filter(row => row[region] === i),
    );

    result = result.map((j, index) => {
      let tmpData = j;

      // Second filter, if necessary
      if (filter) {
        Object.entries(filter).forEach(([key, tmpValue]) => {
          tmpData = tmpData.filter(i => tmpValue.includes(i[key]));
        });
      }

      return {
        region: regions[index],
        cases: tmpData.length,
      };
    });

    setCounters(result);
    // console.log(result);
  }, [data, region, filter]);

  /**
   * Downloads the data sheet (.xlsx) with the counted data.
   */
  async function handleSubmit() {
    const wb = new xl.Workbook();

    write(wb, counters, 'Sheet1');

    const buffer = await wb.writeToBuffer();

    download(buffer, 'total number of cases');
  }

  useEffect(() => {
    if (region === null) return;

    handleChanges();
  }, [region, handleChanges]);

  useEffect(() => {
    if (region === null || data.length === 0) {
      setValue(null);
      return;
    }

    setValue({ id: region, name: data[0][region] });
  }, [region, data]);

  useEffect(() => {
    if (data.length !== 0) return;

    setRegion(null);
    setValue(null);
  }, [data]);

  useEffect(() => {
    document.title = 'Cases | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Import your data sheet (.xlsx) to automatically count the total number
          of records for a specific region.
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
              style={{ marginTop: 15 }}
              clearOnEscape
              options={data[0].map((i, index) => ({ id: index, name: i }))}
              getOptionLabel={option => option.name}
              getOptionSelected={(option, tmpValue) =>
                option.name === tmpValue.name
              }
              value={value}
              onChange={(event, tmpValue) =>
                setRegion(tmpValue ? tmpValue.id : null)
              }
              renderInput={params => (
                <TextField {...params} autoFocus label="Region" />
              )}
            />
            <FormHelperText margin="dense">
              This column will be used to count the number of cases per area
            </FormHelperText>

            <Typography
              color="textSecondary"
              gutterBottom
              style={{ marginTop: 15 }}
            >
              Filter <i>n</i> values if you want
            </Typography>

            {data[0].map(
              (i, index) =>
                index !== region && (
                  <Filter
                    // eslint-disable-next-line react/no-array-index-key
                    key={`filter-${index}`}
                    columnName={i}
                    columnIndex={index}
                    options={getColumnData(data, index)}
                    filter={filter}
                    setFilter={setFilter}
                  />
                ),
            )}
          </>
        )}

        <div id="web-submit-button">
          <Button
            disabled={data.length === 0 || region === null}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Content>

      <Table
        header={
          data.length > 0 && region !== null
            ? [data[0][region], 'cases']
            : ['column']
        }
        rows={
          data.length > 0 && region !== null
            ? counters.map(i => [i.region, i.cases])
            : [['File not yet attached or region not informed']]
        }
      />

      <div id="mobile-submit-button">
        <Button
          disabled={data.length === 0 || region === null}
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
          value={region}
          handleChange={setRegion}
          title="Region"
          row={false}
          options={data.length > 0 ? data[0] : []}
          helperText="This column will be used to count the number of cases per area"
        />
      </DialogImportXlsx>
    </Container>
  );
}

Cases.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Cases;
