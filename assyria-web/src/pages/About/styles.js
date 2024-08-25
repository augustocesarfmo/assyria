import styled from 'styled-components';

export const Container = styled.div`
  display: flexbox;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media (min-width: 320px) and (max-width: 960px) {
    /* align-items: unset; */
    display: block;
    align-items: unset;
    justify-content: unset;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: center;

  #develop-by-text {
    width: 100%;
  }

  ul {
    padding-left: 20px;
  }

  #social-networks {
    display: flex;

    .MuiTypography-root {
      display: flex;

      & + .MuiTypography-root {
        margin-left: 10px;
      }

      svg {
        margin-right: 5px;
      }

      > span {
        display: flex;
      }
    }
  }

  @media (min-width: 320px) and (max-width: 960px) {
    width: 100%;
    padding-bottom: 20px;
    align-items: unset;

    #social-networks {
      display: block;

      .MuiTypography-root {
        & + .MuiTypography-root {
          margin-left: 0px;
        }
      }
    }
  }
`;
