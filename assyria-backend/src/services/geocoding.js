import NodeGeocoder from 'node-geocoder';
import nodeGeocoderConfig from '../config/nodeGeocoder';

const geocoder = NodeGeocoder(nodeGeocoderConfig); // Configuração do Node Geocoder

const geocoding = async (address) => {
  const [response] = await geocoder.geocode(address);

  if (!response) {
    throw new Error('Location not found');
  }

  const {
    formattedAddress,
    latitude,
    longitude,
    streetName,
    streetNumber,
    extra: { neighborhood },
    administrativeLevels: { level2long, level1long },
    zipcode,
  } = response;

  return {
    formattedAddress, // Endereço completo (rua) (número) (bairro) (cidade) (estado) (CEP) (país)
    streetName: streetName || '', // Rua
    streetNumber: streetNumber || '', // Número
    neighborhood: neighborhood || '', // Bairro
    city: level2long || '', // Cidade
    state: level1long || '', // Estado
    cep: zipcode || '', // CEP
    latitude,
    longitude,
  };
};

export default geocoding;
