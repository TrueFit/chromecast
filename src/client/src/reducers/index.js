import { combineReducers } from 'redux';

import chromecasts from './chromecasts';
import slides from './slides';

const rootReducer = combineReducers({
  chromecasts,
  slides,
});

export default rootReducer;
