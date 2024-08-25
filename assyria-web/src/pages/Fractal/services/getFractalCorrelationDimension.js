import numeric from 'numericjs';
import { distance } from '~/services/fractal';

const R = 6371.0; // Earth's degrees - used to transform the calculated distance to meters

/**
 * Recovers the greatest distance between event pairs from the geographic coordinate dataset.
 * @param {Array} data Dataset with the geographical coordinates.
 * @returns The maximum distance in km between pairs of events.
 */
function getMaxDistance(data) {
  let eventWithmaxDistance = 0; // Event pair with the maximum distance between them

  data.forEach((i, row) => {
    data.forEach((j, column) => {
      if (row === column) return;

      const dist = distance({ origin: i, destination: j });
      // console.log(`distance: ${dist}`);
      if (eventWithmaxDistance < dist) eventWithmaxDistance = dist; // Overwrite the variable always with the highest value
    });
  });

  // console.log('eventWithmaxDistance', eventWithmaxDistance * R);
  return eventWithmaxDistance * R; // Distance in km
}

/**
 * Simulates the behavior of a limit function tending from 1 to the maximum value of the data set (greater distance between event pairs).
 * @param {Number} maxValue Maximum distance between an event pair of a dataset.
 * @returns Distance limit array.
 */
// eslint-disable-next-line no-unused-vars
function getRLimits(maxValue) {
  const rArray = [];
  let ir = 1.0;
  const increase = 1.2;
  // const increase = 2.0;
  const limit = Math.round(maxValue);

  while (ir <= limit + increase) {
    rArray.push(ir);
    ir *= increase;
  }

  // console.log('rArray', rArray);
  return rArray;
}

/**
 * Counts the number of distances less than r vector.
 * @param {*} rVector Array with each r distance generated (limit).
 * @param {*} data Dataset with the geographical coordinates.
 * @returns Array with the number of distances less then r.
 */
function getNumberOfDistancesLessThenR(rVector, data) {
  let count = 0;

  const distancesCounter = rVector.map(rValue => {
    count = 0; // Resets count

    data.forEach((i, row) => {
      data.forEach((j, column) => {
        if (row === column) return;

        const dist = distance({ origin: i, destination: j });
        // console.log(dist * R); // Distance in km
        if (dist * R < rValue) count += 1;
      });
    });
    // console.log('count', count);
    // console.log('rValue', rValue);
    return count;
  });

  // console.log('distancesCounter', distancesCounter);
  return distancesCounter;
}

/**
 * Calculates the fractal dimension for each r distance and applies the logarithm.
 * @param {Array} distancesCounterVector Array with each distancesCounter < each value of r.
 * @param {Array} rVector Array with each r distance generated (limit).
 * @param {Number} dataLength The total length of the dataset.
 * @returns Object with data array with values of logR, Cn and logCn.
 */
function applyLogarithm(distancesCounterVector, rVector, dataLength) {
  const logR = [];
  const Cn = []; // Array values of Cn function
  const logCn = [];

  distancesCounterVector.forEach((k, index) => {
    logR.push(Math.log(rVector[index])); // Apply the log at each r distance generated
    const dim = ((2 * k) / (dataLength * (dataLength - 1))).toFixed(5); // Calc the fractal dimension for each distancesCount < each value of r
    Cn.push(dim);
    logCn.push(Math.log(dim)); // Apply the log to each dimension calculated
  });

  // console.log('logR', logR);
  // console.log('Cn', Cn);
  // console.log('logCn', logCn);
  return { logR, Cn, logCn };
}

/**
 * Least squares polynomial fit.
 * @param {Array} x y-axis data array.
 * @param {Array} y y-axis data array.
 * @returns The coefficients of the polynomial fit.
 */
function getPolynomialFit(x, y) {
  const order = 1;

  const xMatrix = [];
  let xTemp = [];
  const yMatrix = numeric.transpose([y]);

  for (let j = 0; j < x.length; j += 1) {
    xTemp = [];
    for (let i = 0; i <= order; i += 1) {
      xTemp.push(1 * x[j] ** i);
    }
    xMatrix.push(xTemp);
  }

  const xMatrixT = numeric.transpose(xMatrix);
  const dot1 = numeric.dot(xMatrixT, xMatrix);
  const dotInv = numeric.inv(dot1);
  const dot2 = numeric.dot(xMatrixT, yMatrix);
  const coeffs = numeric.dot(dotInv, dot2);

  // console.log('Coefficients a + bx^1 + cx^2...', coeffs);
  // console.log('coeffs', coeffs);
  // console.log('Correlation Dimension = ', coeffs[1][0]);
  return coeffs;
}

function getFractalCorrelationDimension(data) {
  // console.log('data', data);
  const N = data.length;

  // eslint-disable-next-line no-unused-vars
  const eventWithmaxDistance = getMaxDistance(data);
  // const rVector = getRLimits(eventWithmaxDistance);
  const rVector = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const distancesCounter = getNumberOfDistancesLessThenR(rVector, data);
  const { logR, Cn, logCn } = applyLogarithm(distancesCounter, rVector, N);

  const coeffs = getPolynomialFit(logR, logCn);
  const bestFitLineArray = logR.map(i => {
    const a = i * coeffs[1][0];
    return a + coeffs[0][0];
  });

  return {
    rVector,
    dc: coeffs[1][0].toFixed(4), // Fractal correlation dimension
    logR,
    Cn,
    logCn,
    bestFitLineArray,
  };
}

export default getFractalCorrelationDimension;
