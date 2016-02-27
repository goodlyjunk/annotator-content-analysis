import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, RouterContext, hashHistory } from 'react-router';
import Routes from 'routes';
import configureStore from './store/appStore.js';

import 'app.scss';

const store = configureStore();

let elem = document.createElement('div');
elem.id = ('react-root');
document.body.appendChild(elem);

render(
  <Router
    history={ hashHistory }
    routes={ Routes } />,
  document.getElementById('react-root')
);
