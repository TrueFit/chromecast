import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import CastState from './cast_state.js';
import CastSenderSession from './cast_sender_session';

import Casts from './casts';
import Slides from './slides';

const rootReducer = combineReducers({
  form: formReducer,

  castState: CastState,
  castSender: CastSenderSession,

  casts: Casts,
  slides: Slides
});

export default rootReducer;
