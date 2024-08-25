import styled from 'styled-components';

import { inputProps } from '~/styles/metrics';
import ButtonImportXlsxComponent from '~/components/ButtonImportXlsx';
import FilterComponent from '~/components/Filter';

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
  padding-right: 24px;
  flex-direction: column;
  overflow-y: auto;

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
    padding-right: 0px;
    margin-bottom: 7px;
    overflow: unset;
  }
`;

export const ButtonImportXlsx = styled(ButtonImportXlsxComponent)`
  ${inputProps};
`;

export const Options = styled.div`
  flex: 0 1 auto;
  overflow-y: auto;
`;

export const Filter = styled(FilterComponent)`
  margin-bottom: 8px;
`;
