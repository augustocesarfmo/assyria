/**
 * Returns the angular distance between two event points.
 * @param {Object} origin Geolocation data of origin locale.
 * @param {Object} destination Geolocation data of destination locale.
 */
const distance = ({ origin, destination }) => {
  const lat1 = origin.lat;
  const lat2 = destination.lat;

  const lon1 = origin.lng;
  const lon2 = destination.lng;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;

  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const d = Math.acos(
    Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  );

  return d;
};

/**
 * Returns the value of the fractal dimension of an array of event points.
 * @param {Array} markers Array of event points.
 * @param {Number} rDistance Fractal r distance (degrees).
 */
const dimension = ({ markers, rDistance }) => {
  const N = markers.length; // Total population number
  let count = 0; // Count the number of distance less than r

  markers.forEach((i, row) => {
    markers.forEach((j, column) => {
      if (row === column) return;

      const dist = distance({ origin: i, destination: j });
      if (dist < rDistance) count += 1;
    });
  });

  return (2 * count) / (N * (N - 1));
};

export { distance, dimension };
