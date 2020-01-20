import {createGlobalStyle} from 'styled-components';

import Bandeira from '../assets/Bandeira/Bandeira.png';

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  html, body, #root{
    min-height: 100%;
  }
  body{
    -webkit-font-smoothing: antialiased !important;

    background: url(${Bandeira});
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
  }
  body, input, button{
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    font-family: 'Roboto', sans-serif;
  }
  button{
    cursor: pointer;
  }

`;
