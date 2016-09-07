import { LOAD_CHROMECASTS_SUCCESS } from 'actions';

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_CHROMECASTS_SUCCESS:
      return action.payload.data;

    default:
      return state;
  }
};
