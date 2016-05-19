require('./styles/base.scss');

import React, { Component } from 'react';
import Dashboard from './components/Dashboard.jsx';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
);
