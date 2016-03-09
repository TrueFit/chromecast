import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Config from './components/config';
import Launch from './components/launch';
import Play from './components/play';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Config} />
    <Route path="config" component={Config} />
    <Route path="launch" component={Launch} />
    <Route path="play" component={Play} />
  </Route>
);
