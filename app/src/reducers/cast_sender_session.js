import { CONNECT_SUCCESS, CONNECT_FAILURE } from '../actions';

const INITIAL_STATE = {
  session: null,
  connectionError: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_SUCCESS:
      return {
        session: action.payload,
        connectionError: null
      };

    case CONNECT_FAILURE:
      return {
        session: null,
        connectionError: action.payload
      };
  }

  return state;
};
