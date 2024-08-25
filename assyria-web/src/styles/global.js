import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    font-family: 'Open Sans', 'Roboto',  sans-serif;
    -webkit-font-smoothing: antialiased !important;
    text-rendering: optimizeLegibility;
  }

  input, textarea, button {
    font-family: 'Open Sans', 'Roboto',  sans-serif;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0px;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;
