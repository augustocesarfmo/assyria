import styled from 'styled-components';

import ChipComponent from '@material-ui/core/Chip';
import { inputProps } from '~/styles/metrics';
import InputSliderComponent from '~/components/InputSlider';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 42.5% 0% 57.5%;
  height: 100%;

  @media (min-width: 320px) and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    height: 1050px;
  }
`;

export const Content = styled.div`
  padding-right: 24px;
  display: block;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 960px) {
    padding-right: 0px;
  }

  .MuiFormControl-root {
    ${inputProps};
    display: block;
    margin-bottom: 15px;
  }

  .MuiAlert-root {
    @media (min-width: 320px) and (max-width: 960px) {
      margin-bottom: 5px;
    }
  }
`;

export const Chip = styled(ChipComponent)`
  margin-top: 10px;
  margin-bottom: 3px;
`;

export const InputSlider = styled(InputSliderComponent)`
  ${inputProps};
`;
