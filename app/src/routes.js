import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import Config from './containers/config';
import Launch from './containers/launch';
import Play from './containers/play';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Config} />
    <Route path="config" component={Config} />
    <Route path="launch" component={Launch} />
    <Route path="play" component={Play} />
  </Route>
);
