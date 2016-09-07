import { LOAD_SLIDES_SUCCESS } from 'actions';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_SLIDES_SUCCESS:
      return action.payload.data;

    default:
      return state;
  }
};
