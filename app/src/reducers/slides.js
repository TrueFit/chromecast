import { LOAD_SLIDES_SUCCESSFUL, LOAD_SLIDES_FAILURE } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SLIDES_SUCCESSFUL:
      return action.payload.data;

    case LOAD_SLIDES_FAILURE:
      break;
  }

  return state;
};
