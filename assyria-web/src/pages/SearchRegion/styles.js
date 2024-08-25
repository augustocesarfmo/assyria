import styled from 'styled-components';

import { inputProps } from '~/styles/metrics';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 42.5% 57.5%;
  height: 100%;

  > pre {
    margin: 0px;
    overflow-y: auto;
  }

  @media (min-width: 320px) and (max-width: 960px) {
    display: block;
  }
`;

export const Content = styled.div`
  padding-right: 24px;

  .MuiAutocomplete-root {
    ${inputProps};
  }

  @media (min-width: 320px) and (max-width: 960px) {
    padding-right: 0px;
    margin-bottom: 15px;
  }
`;
