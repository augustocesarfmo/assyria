import axios from 'axios';
import geocoder from '~/config/geocoder';

const defaultObject = {
  formatted_address: '',
  latitude: '',
  longitude: '',
  street_name: '',
  street_number: '',
  neighborhood: '',
  city: '',
  state: '',
  zipcode: '',
};

/**
 * Returns prettier response from Google Maps API geocoding request.
 * @param {Object} address JSON response of Google Maps API geocoding request.
 */
function formatter(address) {
  const {
    address_components,
    formatted_address,
    geometry: {
      location: { lat, lng },
    },
  } = address;

  const object = {
    ...defaultObject,
    formatted_address,
    latitude: lat,
    longitude: lng,
  };

  address_components.forEach(i => {
    i.types.forEach(type => {
      switch (type) {
        case 'route':
          object.street_name = i.long_name;
          break;

        case 'street_number':
          object.street_number = i.long_name;
          break;

        case 'neighborhood':
        case 'sublocality':
          object.neighborhood = i.long_name;
          break;

        // City
        case 'administrative_area_level_2':
          object.city = i.long_name;
          break;

        // State
        case 'administrative_area_level_1':
          object.state = i.long_name;
          break;

        case 'postal_code':
          object.zipcode = i.long_name;
          break;

        default:
          break;
      }
    });
  });

  return object;
}

/**
 * Geocoding is the process of converting addresses (like "1600 Amphitheatre
 * Parkway, Mountain View, CA") into geographic coordinates
 * (like latitude 37.423021 and longitude -122.083739),
 * which you can use to place markers on a map, or position the map.
 * @param {String} address Address of a specifc locale.
 */
const geocoding = async address => {
  try {
    const { data } = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: geocoder.apiKey,
        },
      },
    );

    return formatter(data.results[0]);
  } catch (error) {
    throw new Error('Location not found');
  }
};

export { geocoding, defaultObject };
