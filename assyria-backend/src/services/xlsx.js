/**
 * Returns unrepeated data for a specific column.
 * @param {Array} data Data matrix from the .xlsx file.
 * @param {Number} columnIndex Index of column.
 */
function getColumnData(data, columnIndex) {
  const result = data.map((element) => element[columnIndex]);
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
function getCoordinates(data, columns) {
  const [latitude, longitude] = columns;

  const coordinates = data.map((i) => ({
    lat: Number(i[latitude]),
    lng: Number(i[longitude]),
  }));

  return coordinates;
}

export {
  getColumnData,
  getSelectedColumnIndexes,
  getSelectedColumnNames,
  getCoordinates,
};
