import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import GeocodingController from './controllers/GeocodingController';
import FractalController from './controllers/FractalController';

import validateFractalStore from './validators/FractalStore';

const routes = new Router();
const upload = multer(multerConfig);

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

routes.get('/teste', async function teste(req, res) {
  const value = getRandomArbitrary(100, 1000);

  await sleep(value);
  if (value < 500) {
    return res.json({ ok: value });
  }

  return res.status(400).json({ ok: value });
});

// Returns geolocation data from a string address
routes.post('/geocoding', upload.single('file'), GeocodingController.create);
routes.get('/geocoding', GeocodingController.show);

// Calculates the fractal dimension of a data matrix
routes.post(
  '/fractal',
  upload.single('file'),
  validateFractalStore,
  FractalController.create
);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
