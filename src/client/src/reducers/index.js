import { combineReducers } from 'redux';

import chromecasts from './chromecasts';
import slides from './slides';
import casts from './casts';

const rootReducer = combineReducers({
  chromecasts,
  slides,
  casts,
});

export default rootReducer;
