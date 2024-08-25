import { v4 as uuidv4 } from 'uuid';

/**
 * Returns unrepeated data for a specific column.
 * @param {Array} data Data matrix from the .xlsx file.
 * @param {Number} columnIndex Index of column.
 */
function getColumnData(data, columnIndex) {
  const result = data.slice(1).map(element => element[columnIndex]);
  return [...new Set(result)];
}

/**
 * Returns the indexes of selected columns from a boolean object.
 * @param {Object} columns Boolean object.
 */
function getSelectedColumnIndexes(columns) {
  const result = Object.values(columns).reduce((acc, curr, index) => {
    if (curr) {
      acc.push(index);
    }
    return acc;
  }, []);

  return result;
}

/**
 * Returns the keys of selected columns from a boolean object.
 * @param {Object} columns Boolean object.
 */
function getSelectedColumnNames(columns) {
  const result = Object.entries(columns).reduce((acc, [key, value]) => {
    if (value) {
      acc.push(key);
    }
    return acc;
  }, []);

  return result;
}

/**
 * Returns the geographic coordinates (lat and lng) of a data array.
 * @param {Array} data Data matrix from the .xlsx file.
 * @param {Array} columns Array with latitude and longitude indexes.
 */
function getCoordinatesAndData(data, columns) {
  const [latitude, longitude] = columns;
  const header = data[0].filter((_, index) => !columns.includes(index)); // Removes lat and lng from the array

  const coordinates = data.slice(1).map(i => {
    // Removes lat and lng from the array
    const rest = i.filter((_, index) => !columns.includes(index));
    // console.log(rest);

    const position = {
      lat: Number(i[latitude]),
      lng: Number(i[longitude]),
    };

    return {
      id: uuidv4(),
      info: [...rest],
      position,
    };
  });

  return {
    header,
    markers: coordinates,
  };
}

export {
  getSelectedColumnIndexes,
  getSelectedColumnNames,
  getCoordinatesAndData,
  getColumnData,
};
