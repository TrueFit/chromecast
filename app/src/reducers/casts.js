import { LOAD_CASTS_SUCCESSFUL, LOAD_CASTS_FAILURE } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CASTS_SUCCESSFUL:
      return action.payload.data;

    case LOAD_CASTS_FAILURE:
      break;
  }

  return state;
};
