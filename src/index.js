require('!style!css!./styles/index.css');
require('!style!css!muicss/lib/css/mui.css');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';

import Layout from './layout';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);
