import styled from 'styled-components';

import InputComponent from '@material-ui/core/Input';

export const Container = styled.div``;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;

  > .MuiAlert-root {
    padding: 0px;
    color: inherit;
    background: none !important;

    p:first-of-type {
      margin-bottom: 5px;
    }
  }
`;

export const InputNumber = styled(InputComponent)`
  margin-right: 5px;
  margin-bottom: 5px;
`;
