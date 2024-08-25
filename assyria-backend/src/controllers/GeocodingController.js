/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { resolve } from 'path';
import { read, write, xl } from '../utils';

import geocoding from '../services/geocoding';

class GeocodingController {
  async create(req, res) {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: 'File not attached' });
    }

    const data = read(file.path);

    const success = []; // Array de endereços geolocalizados
    const failure = []; // Array de endereços que falharam na geolocalização
    const wb = new xl.Workbook();

    // https://medium.com/@oieduardorabelo/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0
    // Geolocaliza de forma desorganizada, porém de forma otimizada

    /* const promises = data.map(async (element, index) => {
      if (index < 1) return; // Descosidera o cabeçalho da tabela

      const [id, address] = element;

      try {
        const response = await geocoding(address);

        success.push({ id, ...response });
      } catch (error) {
        failure.push({ id, address });
      }
    });

    await Promise.all(promises); */

    for (const [index, value] of data.entries()) {
      if (index < 1) continue; // Descosidera o cabeçalho da tabela

      const [id, address] = value;
      console.log(id);
      try {
        const response = await geocoding(address);

        success.push({ id, ...response });
      } catch (error) {
        failure.push({ id, address });
      }
    }

    fs.unlinkSync(file.path); // Deleta o arquivo enviado do sistema

    write(wb, failure, 'failure'); // Escreve os registros de falha na folha `failure` do arquivo .xsls
    write(wb, success, 'success'); // Escreve os registros de sucesso na folha `success` do arquivo .xsls

    const buffer = await wb.writeToBuffer();

    // A requisição é cancelada ao geolocalizar muitos registros, salva a geocodificação localmente
    if (data.length > 70) {
      const path = resolve(__dirname, '..', '..', 'tmp', 'uploads');
      wb.write(`${path}/geocoding-${new Date().getTime()}.xlsx`);
    }

    res.attachment('data.xlsx');
    return res.send(Buffer.from(buffer)); // binaryBuffer
  }

  async show(req, res) {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address not informed' });
    }

    try {
      const response = await geocoding(address);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new GeocodingController();
