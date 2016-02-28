import { combineReducers } from 'redux';

import CastState from './cast_state.js';
import CastSenderSession from './cast_sender_session';

const rootReducer = combineReducers({
  castState: CastState,
  castSender: CastSenderSession
});

export default rootReducer;
