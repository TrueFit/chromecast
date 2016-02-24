import { combineReducers } from 'redux';

import Images from './images';

const rootReducer = combineReducers({
  images: Images
});

export default rootReducer;
