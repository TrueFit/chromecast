import { LOAD_CASTS_SUCCESSFUL } from 'actions';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_CASTS_SUCCESSFUL:
      return action.payload.data;

    default:
      return state;
  }
};
