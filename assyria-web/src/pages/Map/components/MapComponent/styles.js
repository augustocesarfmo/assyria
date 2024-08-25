import styled from 'styled-components';

export const InfoContainer = styled.div`
  color: #000;

  > h2 {
    margin-bottom: 10px;
  }

  div {
    & + div {
      margin-top: 5px;
    }
  }
`;
