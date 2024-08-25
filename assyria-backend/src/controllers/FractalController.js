import fs from 'fs';
import { read, write, xl } from '../utils';
import { dimension } from '../services/fractal';
import { getColumnData, getCoordinates } from '../services/xlsx';

class FractalController {
  async create(req, res) {
    const { file } = req;
    const { rDistance, coords, region, filter } = req.body;

    // Cache the .xlsx informations as JSON
    const data = read(file.path);

    // Regions not repeated for use in the first filter
    const regions = getColumnData(data, region);

    // Separates data sets by region
    const result = regions.map((i) => {
      return data.filter((row) => row[region] === i);
    });

    // Second filter and calculation of the fractal dimension
    const fractal = result.map((row, index) => {
      let tmpData = row;

      // Second filter, if necessary
      if (filter) {
        Object.entries(JSON.parse(filter)).forEach(([key, value]) => {
          tmpData = tmpData.filter((i) => value.includes(i[key]));
        });
      }

      // Retrieves only the coordinates of the data set
      const coordinates = getCoordinates(tmpData, coords);

      // Calculation of the fractal dimension
      const dim = dimension({ markers: coordinates, rDistance });

      return {
        region: regions[index],
        dimension: dim,
        cases: coordinates.length,
      };
    });

    // console.log(fractal);

    fs.unlinkSync(file.path); // Deletes the attached file from system

    const wb = new xl.Workbook();

    write(wb, fractal, 'dimension'); // Writes the data on the .xlsx file

    const buffer = await wb.writeToBuffer();

    res.attachment('data.xlsx');
    return res.send(Buffer.from(buffer)); // binaryBuffer
  }
}

export default new FractalController();
