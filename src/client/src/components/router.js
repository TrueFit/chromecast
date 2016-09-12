import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Play from './play';
import Launch from './launch';

export default () =>
(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Play} />
      <Route path="play/:castName" component={Play} />
      <Route path="launch" component={Launch} />
    </Route>
  </Router>
);
