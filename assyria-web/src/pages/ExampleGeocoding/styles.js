import styled from 'styled-components';

import { inputProps } from '~/styles/metrics';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 42.5% 57.5%;
  height: 100%;

  > pre {
    margin: 0px;
  }

  @media (min-width: 320px) and (max-width: 960px) {
    display: block;
  }
`;

export const Content = styled.div`
  margin-right: 24px;

  #text-input {
    ${inputProps};
    display: flex;

    #mobile-submit-button {
      display: none;
      margin-left: 5px;
    }
  }

  #web-submit-button {
    margin-top: 25px;
    align-content: center;
    display: flex;
    justify-content: center;

    > button {
      width: 70%;
    }
  }

  @media (min-width: 320px) and (max-width: 960px) {
    margin-right: 0px;
    margin-bottom: 15px;

    #web-submit-button {
      display: none;
    }

    #mobile-submit-button {
      display: flex !important;
    }
  }
`;
