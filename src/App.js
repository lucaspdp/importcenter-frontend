import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import Router from './router';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css'

function App() {
  return (
    <>
    
      <ToastContainer />
      <CssBaseline />
      <Router />
      {/* <GlobalStyle /> */}
    </>
  );
}

export default App;
