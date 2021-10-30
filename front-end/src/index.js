/* eslint-disable prettier/prettier */
import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';

import 'normalize.css';
import './index.css';

import Root from './pages/Root';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
