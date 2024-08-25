import styled from 'styled-components';

import AppBarComponent from '@material-ui/core/AppBar';
import ToolbarComponent from '@material-ui/core/Toolbar';

export const AppBar = styled(AppBarComponent).attrs({
  elevation: 0,
})`
  display: none;
  background-color: transparent !important;

  @media (min-width: 320px) and (max-width: 960px) {
    display: block;
    color: inherit !important;
  }
`;

// Necessary for content to be below app bar
export const Toolbar = styled(ToolbarComponent)`
  display: none !important;

  @media (min-width: 320px) and (max-width: 960px) {
    display: flex !important;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  height: 100vh;
  padding: 20px;
`;
