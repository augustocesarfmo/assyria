import styled from 'styled-components';

import { inputProps } from '~/styles/metrics';
import ButtonImportXlsxComponent from '~/components/ButtonImportXlsx';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 42.5% 57.5%;
  height: 100%;

  #mobile-submit-button {
    display: none;
  }

  > pre {
    margin: 0px;
    overflow-y: auto;
  }

  @media (min-width: 320px) and (max-width: 960px) {
    display: block;

    #mobile-submit-button {
      margin-top: 25px;
      padding-bottom: 20px;
      display: flex;
      align-content: center;
      justify-content: center;

      > button {
        width: 70%;
      }
    }

    #web-submit-button {
      display: none !important;
    }
  }
`;

export const Content = styled.div`
  padding-right: 24px;

  @media (min-width: 320px) and (max-width: 960px) {
    padding-right: 0px;
    margin-bottom: 15px;
  }

  .MuiFormControl-root {
    ${inputProps};
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
`;

export const ButtonImportXlsx = styled(ButtonImportXlsxComponent)`
  ${inputProps};
`;
