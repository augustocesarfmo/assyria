/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckboxesGroup from '~/components/CheckboxesGroup';
import DialogImportXlsx from '~/components/DialogImportXlsx';
import Table from './components/Table';
import Backdrop from '~/components/BackdropComponent';
import IconButtons from './components/IconButtons';
import AlertDialog from './components/AlertDialog';

import {
  getSelectedColumnIndexes,
  getSelectedColumnNames,
  getColumnData,
} from '~/services/coordinates';
import getCoordinatesService from './services/getCoordinatesService';
import { dimension } from '~/services/fractal';
import getFractalCorrelationDimension from './services/getFractalCorrelationDimension';
import { write, download, xl } from '~/services/xlsx';

import {
  Container,
  Content,
  ButtonImportXlsx,
  InputSlider,
  ColumnList,
  Filter,
} from './styles';

// import api from '~/services/api';
import dataExample from '~/tmp/dataExampleFractal';

function Fractal({ pageName }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGraphicVisible, setModalGraphicVisible] = useState(false);
  const [data, setData] = useState(dataExample ? dataExample.data : []); // Stores as JSON format the data of .xlsx file
  const [selected, setSelected] = useState(
    dataExample ? dataExample.selected : {},
  ); // Handles the selected columns of sheet
  const [rDistance, setrDistance] = useState(0.00157); // Fractal r distance
  const [file, setFile] = useState(null); // Metadata of attached file (.xlsx)
  const [region, setRegion] = useState(dataExample ? dataExample.region : null); // Index of selected area of interest
  const [filter, setFilter] = useState(null); // Stores the values of filtered options
  const [fractal, setFractal] = useState([]); // Handles fractal dimension calculation per region
  const [loading, setLoading] = useState(false);
  const [graphicValues, setGraphicValues] = useState({});

  const addColumnButton = Object.values(selected).filter(v => v).length; // Handles the display of add button column
  /**
   * Fires when the file is removed.
   */
  function handleDeleteFile() {
    setFile(null);
    setSelected({});
    setData([]);
    setRegion(null);
  }

  /**
   * Handles the changes on the input file.
   */
  function handleFileChange(e) {
    const tmpFile = e.target.files[0];
    setFile(tmpFile);
  }

  /**
   * Sends data file to server and return calculated fractal dimension.
  async function handleSubmitServer() {
    try {
      const formData = new FormData();
      formData.append('file', file); // Attached file
      formData.append('rDistance', rDistance); // Fractal r distance
      formData.append('region', region); // Index of selected area of interest

      // Lat and lng column indexes
      getSelectedColumnIndexes(selected).forEach((i) => {
        formData.append('coords[]', i);
      });

      // Object with filtered options
      if (filter) formData.append('filter', JSON.stringify(filter));

      const { data } = await api.post('/fractal', formData, {
        responseType: 'blob',
      });

      download(data);
    } catch (error) {
      console.log(error);
    }
  } */

  /**
   * Local data download.
   */
  async function handleSubmitLocal() {
    setLoading(true);

    const wb = new xl.Workbook();

    const rest = fractal.map(j => {
      // eslint-disable-next-line no-unused-vars
      const { data: exclProp, ...newObj } = j;
      return newObj;
    }); // Removes data property from fractal object

    write(wb, rest, 'Sheet1');

    const buffer = await wb.writeToBuffer();

    download(buffer, 'fractal dimension');
    setLoading(false);
  }

  const handleChanges = useCallback(() => {
    // Regions not repeated for use in the first filter
    const regions = getColumnData(data, region.id);
    // Geographic column indexes (lat & lng)
    const coords = getSelectedColumnIndexes(selected);

    // Separates the dataset by region
    let result = regions.map(i => {
      return data.slice(1).filter(row => row[region.id] === i);
    });

    result = result.map((j, index) => {
      let tmpData = j;

      // Second filter, if necessary
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          tmpData = tmpData.filter(i => value.includes(i[key]));
        });
      }

      // Retrieves only the coordinates of the dataset
      const markers = getCoordinatesService(tmpData, coords);
      // Calculation of the fractal dimension
      const dim = dimension({ markers, rDistance });

      return {
        region: regions[index],
        dimension: dim,
        cases: tmpData.length,
        data: markers,
      };
    });

    setFractal(result);
  }, [data, region, selected, rDistance, filter]);

  useEffect(() => {
    if (region === null) return;

    handleChanges();
  }, [region, handleChanges]);

  /**
   * Updates the object of columns that can be selected
   */
  useEffect(() => {
    if (!file || data.length === 0) return;

    const obj = data[0].reduce((tmpObj, value) => {
      // eslint-disable-next-line no-param-reassign
      tmpObj[value] = false;
      return tmpObj;
    }, {});

    setSelected(obj);
    setRegion(null);
  }, [file, data, setSelected]);

  useEffect(() => {
    document.title = 'Fractal | Spatial Workspace';
  }, []);

  /**
   * Shows in the alert dialog the fractal dimension graph for each region.
   * @param {*} item Data with geographic coordinates.
   */
  function getGraphic(item) {
    const {
      rVector,
      dc,
      logR,
      logCn,
      Cn,
      bestFitLineArray,
    } = getFractalCorrelationDimension(item.data);

    setGraphicValues({
      dialogTitle: 'Log–log plot of C(r) versus log(r)',
      graphTitle: item.region,
      xaxis: { title: 'log(r)' },
      yaxis: { title: 'logC(r)' },
      annotations: [
        {
          x: logR[1],
          y: logCn[5],
          text: `D<sub>c</sub>=${dc}`,
          showarrow: false,
        },
      ],
      values: [
        {
          x: logR,
          y: logCn,
          // hoverinfo: 'text',
          text: Cn.map(
            (k, index) => `D<sub>c</sub>=${k}<br>${rVector[index]}km`,
          ),
          type: 'scatter',
        },
        {
          x: logR,
          y: bestFitLineArray,
          hoverinfo: 'none',
          type: 'scatter',
        },
      ],
    });

    setModalGraphicVisible(true);
  }

  /**
   * Retrieves fractal dimension values by region dataset.
   * @returns Returns an array of fractal dimension values for each region.
   */
  function getFractalDimensionOfRegions() {
    return fractal.map(item => {
      const result = getFractalCorrelationDimension(item.data);

      return { region: item.region, ...result };
    });
  }

  /**
   * C(r) versus log(r) graph of all regions.
   */
  function getCrVersusLogrGraphic() {
    const result = getFractalDimensionOfRegions();

    setGraphicValues({
      dialogTitle: 'Log–log plot of C(r) versus log(r)',
      graphTitle: 'All regions',
      xaxis: { title: 'log(r)' },
      yaxis: { title: 'C(r)' },
      values: result.map(({ region: regionK, logR, Cn, rVector }) => ({
        x: logR,
        y: Cn,
        type: 'scatter',
        // hoverinfo: 'text',
        text: Cn.map((k, index) => `D<sub>c</sub>=${k}<br>${rVector[index]}km`),
        name: regionK,
      })),
      layout: {
        height: 600,
        legend: { orientation: 'h', y: -0.2 },
      },
    });

    setModalGraphicVisible(true);
  }

  /**
   * Dc versus log(r) graph of all regions.
   */
  function getDcVersusLogrGraphic() {
    const result = getFractalDimensionOfRegions();
    // console.log(result.map(i => ({ region: i.region, dc: i.dc }))); // For get the values to transform in excel file

    const items = []; // Stores the items that no have NaN values

    result.forEach(h => {
      if (h.dc === 'NaN') return;
      items.push(h);
    });

    setGraphicValues({
      dialogTitle: 'Log–log plot of Dc versus log(r)',
      graphTitle: 'All regions',
      xaxis: {
        title: { text: 'Regions', standoff: 20 },
        automargin: true,
        // tickangle: 80,
        ticklen: 5,
      },
      yaxis: { title: 'D<sub>c</sub>' },
      values: [
        {
          x: items.map(i => {
            if (typeof i.region !== 'string') return i.region;

            // const splitted = i.region.split(' ');
            // const first = splitted[0];
            // const second = splitted.slice(1).join(' ');

            // return `${first}<br>${second}`;

            const truncate = text =>
              text.length > 15 ? `${text.substring(0, 15)}...` : text;

            return truncate(i.region);
          }),
          y: items.map(j => j.dc),
          type: 'scatter',
        },
      ],
      layout: {
        height: 600,
      },
    });

    setModalGraphicVisible(true);
  }

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Import your georeferenced data sheet (.xlsx) to automatically
          calculate the fractal dimension for a specific region.
        </Typography>

        <ButtonImportXlsx
          file={file}
          handleFileChange={handleFileChange}
          handleDeleteFile={handleDeleteFile}
          setModalVisible={setModalVisible}
        />

        {data.length > 0 && (
          <>
            <Typography
              color="textSecondary"
              gutterBottom
              style={{ marginTop: 15 }}
            >
              Geographic columns
            </Typography>

            <ColumnList>
              {getSelectedColumnNames(selected).map((i, index) => (
                <li key={`chip-${index}`}>
                  <Chip
                    label={i}
                    onDelete={() => setSelected({ ...selected, [i]: false })}
                  />
                </li>
              ))}

              {addColumnButton < 2 && (
                <li>
                  <Chip
                    icon={<AddCircleIcon />}
                    onClick={() => setModalVisible(true)}
                    label="Add column"
                    variant="outlined"
                  />
                </li>
              )}
            </ColumnList>

            <Autocomplete
              clearOnEscape
              value={region}
              options={data[0].map((i, index) => ({ id: index, name: i }))}
              getOptionLabel={option => option.name}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionDisabled={option =>
                Object.entries(selected).some(
                  ([key, value]) => key === option.name && value,
                )
              }
              onChange={(event, value) => setRegion(value || null)}
              renderInput={params => (
                <TextField
                  {...params}
                  autoFocus
                  label="Region"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // Disables the native autoComplete of browser
                  }}
                />
              )}
            />
            <FormHelperText margin="dense">
              This column will be used to calculate fractal dimension per area
            </FormHelperText>

            <Typography
              color="textSecondary"
              gutterBottom
              style={{ marginTop: 15 }}
            >
              Filter <i>n</i> values if you want
            </Typography>

            {Object.entries(selected).map(
              ([key, value], index) =>
                !value &&
                key !== '' &&
                index !== region?.id && (
                  <Filter
                    key={`filter-${index}`}
                    columnName={key}
                    columnIndex={index}
                    options={getColumnData(data, index)}
                    filter={filter}
                    setFilter={setFilter}
                  />
                ),
            )}
          </>
        )}

        <InputSlider setrDistance={setrDistance} />

        <div id="web-submit-button">
          <Button
            disabled={data.length === 0 || !region}
            variant="outlined"
            color="primary"
            onClick={handleSubmitLocal}
          >
            Submit
          </Button>
        </div>
      </Content>

      <Table
        getDcVersusLogrGraphic={getDcVersusLogrGraphic}
        getCrVersusLogrGraphic={getCrVersusLogrGraphic}
        tableTitle={region ? region.name : 'Table'}
        header={
          fractal.length > 0 && region !== null
            ? // ? [...Object.keys(fractal[0]), 'options'] // The key "data" is not necessary, then... pass
              ['region', 'dimension', 'cases', 'graphic']
            : ['column']
        }
        rows={
          fractal.length > 0 && region !== null
            ? fractal.map(i => [
                i.region,
                i.dimension,
                i.cases,
                <IconButtons onClick={() => getGraphic(i)} />,
              ])
            : [['File not yet attached or region not informed']]
        }
      />

      <div id="mobile-submit-button">
        <Button
          disabled={data.length === 0 || !region}
          variant="outlined"
          color="primary"
          onClick={handleSubmitLocal}
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
        <CheckboxesGroup
          options={selected}
          setState={setSelected}
          title="Select only latitude and longitude"
        />
      </DialogImportXlsx>

      <AlertDialog
        open={modalGraphicVisible}
        setOpen={setModalGraphicVisible}
        data={graphicValues}
        setData={setGraphicValues}
      />

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

Fractal.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Fractal;
