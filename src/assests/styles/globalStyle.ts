import { createGlobalStyle } from 'styled-components';
import {fonts} from "../fonts/fonts";

export const GlobalStyle = createGlobalStyle`

  input[type="search"]::-webkit-search-cancel-button {
    display: none;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  * {
    margin: 0;
    padding: 0;
    border: 0;
    &,
    &::before,
    &::after {
      box-sizing: border-box;
    }
  }

  :active,
  :focus {
    outline: none;
  }

  html,
  body {
    width: 100%;
    min-width: 320px;
    min-height: 100%;
  }

  body {
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    font-family: ${fonts.mainFont};
  }

  input,
  button,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  input::-ms-clear {
    display: none;
  }

  button {
    cursor: pointer;
    color: inherit;

    &::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
  }

  a {
    color: inherit;
    
    &:visited,
    &:hover {
      text-decoration: none;
    }

    &:focus,
    &:active {
      outline: none;
    }
  }

  ul li {
    list-style: none;
  }

  img {
    vertical-align: top;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }
`;


