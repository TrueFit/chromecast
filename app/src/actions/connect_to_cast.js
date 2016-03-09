import CastAway from '../../vendor/castaway/cast-away';
import { APP_ID } from '../support';

export const CONNECT_SUCCESS = "CONNECT_SUCCESS";
export const CONNECT_FAILURE = "CONNECT_FAILURE";

const handleError = (err) => {
  return {
    type: CONNECT_FAILURE,
    payload: err
  };
};

const handleSuccess = (session) => {
  return {
    type: CONNECT_SUCCESS,
    payload: session
  };
};

export const connectToCast = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const castAway = new window.CastAway({
        applicationID: APP_ID
      });

      castAway.on('receivers:available', () => {
        castAway.requestSession((err, s) => {
          if (err) {
            dispatch(handleError(err));
            reject(err);
            return;
          }

          dispatch(handleSuccess(s));
          resolve();
        });
      });

      castAway.on('existingMediaFound', (s) => {
        dispatch(handleSuccess(s));
        resolve();
      });

      castAway.initialize((err, data) => {
        if (err) {
          console.log("unable to initialize", err);
          return;
        }

        console.log("initialized");
      });
    });
  };
};
