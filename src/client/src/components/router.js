import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Play from './play';

export default () =>
(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Play} />
    </Route>
  </Router>
);
