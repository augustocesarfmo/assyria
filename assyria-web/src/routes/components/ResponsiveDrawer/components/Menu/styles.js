import styled from 'styled-components';

export const Container = styled.div`
  #toolbar {
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    #about-link {
      &:hover {
        text-decoration: underline;
        color: ${props => props.color} !important;
      }
    }

    > h2 {
      font-size: 1.15rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    }

    > div {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      line-height: 1.66;
      letter-spacing: 0.03333em;
    }
  }

  .MuiTypography-root {
    font-weight: bold;
  }

  .how-to-use-button {
    > div {
      margin: 0px -10px;
      padding-left: 8px;
      flex: 1;
      border: 2px dashed #b2a300;
      background-color: #b2a30030;
    }
  }
`;

export const SubList = styled.div`
  margin-top: -5px;

  span {
    padding-left: 20px;
  }
`;
