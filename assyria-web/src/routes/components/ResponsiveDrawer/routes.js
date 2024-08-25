import React from 'react';

import HowToUse from '~/pages/HowToUse';
import Map from '~/pages/Map';
import ExampleDistance from '~/pages/ExampleDistance';
import ExampleDimension from '~/pages/ExampleDimension';
import Fractal from '~/pages/Fractal';
import Region from '~/pages/Region';
import ExampleGeocoding from '~/pages/ExampleGeocoding';
import Geocoding from '~/pages/Geocoding';
import SearchRegion from '~/pages/SearchRegion';
import Cases from '~/pages/Cases';
import CRSRegion from '~/pages/CRSRegion';
import About from '~/pages/About';

const routes = [
  {
    path: '/how-to-use',
    main: () => <HowToUse pageName="How to Use" />,
  },
  {
    path: '/',
    exact: true,
    main: () => <Map pageName="Map" />,
  },
  {
    path: '/map',
    main: () => <Map pageName="Map" />,
  },
  {
    path: '/distance',
    main: () => (
      <ExampleDistance pageName="Example of Distance Between Two Points" />
    ),
  },
  {
    path: '/dimension',
    main: () => (
      <ExampleDimension pageName="Example of Fractal Dimension Calculation" />
    ),
  },
  {
    path: '/fractal',
    main: () => <Fractal pageName="Massive Fractal Dimension Calculation" />,
  },
  {
    path: '/region',
    main: () => <Region pageName="Associate Regions" />,
  },
  {
    path: '/search',
    main: () => <SearchRegion pageName="Search Regions" />,
  },
  {
    path: '/crs',
    main: () => <CRSRegion pageName="Associates CRS with City" />,
  },
  {
    path: '/address',
    main: () => <ExampleGeocoding pageName="Example of Address Geocoding" />,
  },
  {
    path: '/geocoding',
    main: () => <Geocoding pageName="Bulk Geocoding of Address" />,
  },
  {
    path: '/cases',
    main: () => <Cases pageName="Number of Cases Counter" />,
  },
  {
    path: '/about',
    main: () => <About pageName="About" />,
  },
];

export default routes;
