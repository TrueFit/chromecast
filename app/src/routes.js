import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import Play from './containers/play';
import Config from './containers/config';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Config} />
    <Route path="play" component={Play} />
  </Route>
);
