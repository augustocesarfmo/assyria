import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 960px) {
    display: block;

    .MuiBottomNavigation-root {
      height: 60px;
    }
  }

  .MuiBottomNavigation-root {
    margin-top: 10px;
  }

  .MuiBottomNavigationAction-root {
    color: inherit;
  }
`;

export const Content = styled.div`
  height: 100%;
`;
