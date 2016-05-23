require('./styles/base.scss');

import React, { Component } from 'react';
import Dashboard from './components/Dashboard.jsx';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import notes from './store/notes.js';
import devTools from 'remote-redux-devtools';

const enhancer = compose(
  devTools()
);

let store = createStore(notes, applyMiddleware(thunk), enhancer);

ReactDOM.render(
  <Provider store={store}>
    <Dashboard/>
  </Provider>,
  document.getElementById('root')
);
