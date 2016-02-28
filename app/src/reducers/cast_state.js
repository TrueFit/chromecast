import { CAST_CONFIGURE_SUCCESS, CAST_CONFIGURE_FAIL } from '../actions';

const INITIAL_STATE = "Ready to cast";

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CAST_CONFIGURE_SUCCESS:
      return `Successful launch of application on cast '${action.payload}'.`;

    case CAST_CONFIGURE_FAIL:
      return "Unable to launch the application.";
  }

  return state;
};
