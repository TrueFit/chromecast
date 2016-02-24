import React from 'react';
import {render} from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

import App from './containers/app';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

// create the store
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
