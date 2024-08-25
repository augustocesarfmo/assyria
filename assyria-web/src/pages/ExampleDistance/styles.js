import styled from 'styled-components';

import FormControlComponent from '@material-ui/core/FormControl';
import { inputProps } from '~/styles/metrics';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 42.5% 0% 57.5%;
  height: 100%;

  @media (min-width: 320px) and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    height: 1400px;
  }
`;

export const Content = styled.div`
  padding-right: 24px;

  @media (min-width: 320px) and (max-width: 960px) {
    padding-right: 0px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  > .MuiFormControl-root {
    ${inputProps};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  > .MuiAlert-root {
    ${inputProps}
    padding: 0px;
    color: inherit;
    background: none !important;

    @media (min-width: 320px) and (max-width: 960px) {
      margin-bottom: 10px;
    }

    p:first-of-type {
      margin-bottom: 5px;
    }
  }
`;

export const FormControl = styled(FormControlComponent)`
  .MuiFormLabel-root {
    margin-bottom: 10px;
  }

  .MuiTextField-root:first-of-type {
    margin-bottom: 5px;
  }
`;
