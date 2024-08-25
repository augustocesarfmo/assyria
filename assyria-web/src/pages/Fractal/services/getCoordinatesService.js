/**
 * Returns the geographic coordinates (lat and lng) of a data array.
 * @param {Array} data Data matrix from the .xlsx file.
 * @param {Array} columns Array with latitude and longitude indexes.
 */
export default function getCoordinatesService(data, columns) {
  const [latitude, longitude] = columns;

  const coordinates = data.map(i => ({
    lat: Number(i[latitude]),
    lng: Number(i[longitude]),
  }));

  return coordinates;
}
