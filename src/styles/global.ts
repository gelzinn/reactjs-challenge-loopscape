import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", system-ui;

    ::-webkit-scrollbar {
      width: .25rem;
    }

    ::-webkit-scrollbar-track {
      background: var(--gray-800);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--gray-700);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--gray-500);
    }
  }

  html {
    height: -webkit-fill-available;
  }

  body {
    position: relative;

    height: 100vh;
    overflow: hidden;

    &[data-theme="dark"] {
      iframe#google-maps {
        filter: invert(1);
      }
    }

    background: var(--gray-800);
  }

  :root {
    --white: white;
    --gray-100: #F1F1F1;
    --gray-200: #E3E3E3;
    --gray-300: #D3D3D3;
    --gray-400: #7A7A7A;
    --gray-500: #2F2F2F;
    --gray-600: #252525;
    --gray-700: #161616;
    --gray-800: #121214;
    --black: black;

    --red: #FF2D2D;
  }

  [data-theme="light"] {
    :root {
      --white: white;
      --gray-100: #F1F1F1;
      --gray-200: #E3E3E3;
      --gray-300: #D3D3D3;
      --gray-400: #7A7A7A;
      --gray-500: #2F2F2F;
      --gray-600: #252525;
      --gray-700: #161616;
      --gray-800: #121214;
      --black: black;

      --red: green;
    }
  }
`;
 
export default GlobalStyle;