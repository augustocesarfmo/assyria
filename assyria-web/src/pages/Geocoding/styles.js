import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import { inputProps } from '~/styles/metrics';
import ButtonImportXlsxComponent from '~/components/ButtonImportXlsx';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 42.5% 57.5%;
  height: 100%;

  #mobile-submit-button {
    display: none;
  }

  .MuiPaper-root {
    border-radius: 0px;
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
  display: flex;
  flex-direction: column;
  margin-right: 24px;

  .MuiAutocomplete-root {
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

  @media (min-width: 320px) and (max-width: 960px) {
    margin-right: 0px;
    margin-bottom: 15px;
  }
`;

export const ButtonImportXlsx = styled(ButtonImportXlsxComponent)`
  ${inputProps};
`;

export const TextProgress = styled(Typography)`
  font-weight: bold;
  text-shadow: 1px 1px #000;
  margin-left: 8px !important;
  width: 1px;
  text-align: center;
`;
