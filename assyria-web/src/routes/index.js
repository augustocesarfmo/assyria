import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { Container } from './styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    type: 'dark',
  },
});

export default function Routes() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container>
          <ResponsiveDrawer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
