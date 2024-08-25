import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import MapComponent from './components/MapComponent';
import DialogImportXlsx from '~/components/DialogImportXlsx';
import CheckboxesGroup from '~/components/CheckboxesGroup'; // CheckboxesGroup

import {
  getSelectedColumnIndexes,
  getCoordinatesAndData,
} from '~/services/coordinates';
import dataExample from '~/tmp/dataExampleGeocoding';

import { Container, Content } from './styles';

function Map({ pageName }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]); // // Stores as JSON format the data of .xlsx file
  const [coordinates, setCoordinates] = useState(
    dataExample
      ? getCoordinatesAndData(dataExample.data, dataExample.coordinatesColumns)
      : { markers: [] },
  ); // Stores the lat & lng (markers) of event points
  const [wrongData, setWrongData] = useState([
    {
      id: '79ad1b2f-0e8d-4a4c-b0e2-f4662d3698e5',
      info: [
        33,
        'Rua Rosa, 111 - Jardim das flores, Osasco',
        'R. Rosa, 111 - Jardim das Flores, Osasco - SP, 06112-130, Brasil',
        'Rua Rosa',
        '111',
        'Jardim das Flores',
        'Osasco',
        'São Paulo',
        '06112-130',
      ],
      position: {
        lat: -23.5351445,
        lng: -46.79450780000001,
      },
    },
    {
      id: 'f321ad02-1cdb-4fbe-bcfe-924d3137ede7',
      info: [
        61,
        'Rua la paz, 280, Guanabara, Londrina',
        'R. La Paz, 280 - Guanabara, Londrina - PR, 86050-140, Brasil',
        'Rua La Paz',
        '280',
        'Guanabara',
        'Londrina',
        'Paraná',
        '86050-140',
      ],
      position: {
        lat: -23.3330503,
        lng: -51.1692006,
      },
    },
    {
      id: 'ba9882f7-7e1b-4c84-8ffb-f9389cc28a8d',
      info: [
        17,
        'maria luíza, cascavel',
        'Maria Luíza, Cascavel - PR, 85819, Brasil',
        '',
        '',
        'Maria Luíza',
        'Cascavel',
        'Paraná',
        '85819',
      ],
      position: {
        lat: -24.9732099,
        lng: -53.44731489999999,
      },
    },
    {
      id: '9c015f6d-afd4-422b-8d01-97441b745916',
      info: [
        102,
        'Rua ernesto beckert, 127, São bento do sul',
        'R. Ernesto Beckert, 127 - Rio Negro, São Bento do Sul - SC, 89287-020, Brasil',
        'Rua Ernesto Beckert',
        '127',
        'Rio Negro',
        'São Bento do Sul',
        'Santa Catarina',
        '89287-020',
      ],
      position: {
        lat: -26.2496037,
        lng: -49.3923371,
      },
    },
  ]); // Wrong spatial data for validation demonstration
  const [selected, setSelected] = useState({}); // Handles the selected columns of sheet

  function handleSubmit() {
    const columns = getSelectedColumnIndexes(selected);
    if (columns.length !== 2) return;

    const tmpCoordinates = getCoordinatesAndData(data, columns);

    setCoordinates(tmpCoordinates);
    setWrongData([]);
  }

  function handleRemoveMarkers() {
    setCoordinates({ markers: [] });
    setWrongData([]);
  }

  useEffect(() => {
    if (data.length === 0) return;

    const obj = data[0].reduce((tmpObj, value) => {
      // eslint-disable-next-line no-param-reassign
      tmpObj[value] = false;
      return tmpObj;
    }, {});

    setSelected(obj); // Updates the object of columns that can be selected
  }, [data, setSelected]);

  useEffect(() => {
    document.title = 'Map | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {pageName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Import your data sheet (.xlsx) with geographic coordinate records to
        view the points dynamically on the Google map.
      </Typography>

      <BottomNavigation showLabels>
        <BottomNavigationAction
          onClick={() => setModalVisible(true)}
          label="Import"
          icon={<PinDropTwoToneIcon />}
        />
        <BottomNavigationAction
          onClick={handleRemoveMarkers}
          label="Remove"
          icon={<HighlightOffTwoToneIcon />}
        />
      </BottomNavigation>

      <DialogImportXlsx
        setData={setData}
        open={modalVisible}
        setOpen={setModalVisible}
        submitButton={handleSubmit}
      >
        <CheckboxesGroup
          options={selected}
          setState={setSelected}
          title="Select only latitude and longitude"
        />
      </DialogImportXlsx>

      <Content>
        <MapComponent
          data={{
            ...coordinates,
            markers: [...coordinates.markers, ...wrongData],
          }}
        />
      </Content>
    </Container>
  );
}

Map.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Map;
