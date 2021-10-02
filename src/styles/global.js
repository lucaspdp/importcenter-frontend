import {createGlobalStyle} from 'styled-components';

import Bandeira from '../assets/Bandeira/Bandeira.jpg';

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

    background: url(${Bandeira}) fixed center center;
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

  #root{
    background: linear-gradient(90deg, #ffffff5f, #0000005f);
  }

  div.fade-enter, div.fader-exit, div.fade-enter-done{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  div.fade-enter, div.fade-appear{
    opacity: 0;
    z-index: 1;
  }
  div.fade-appear-active,
  div.fade-enter.fade-enter-active{
    opacity: 1;
    transition: opacity 150ms linear 50ms;
  }
  div.fade-exit{
    opacity: 1;
  }
  div.fade-exit.fade-exit-active{
    opacity: 0;
    transition: opacity 150ms linear;
  }

  .ml-5{
      margin-left: 5px;
  }
  
`;
