import Http from '../support/http';

export const CAST_CONFIGURE_SUCCESS = "CAST_CONFIGURE_SUCCESS";
export const CAST_CONFIGURE_FAIL = "CAST_CONFIGURE_FAIL";

export const configureCast = (session) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const deviceName = session.session.receiver.friendlyName;

      new Http().post('messages', { message: deviceName }).then(() => {
        dispatch({
          type: CAST_CONFIGURE_SUCCESS,
          payload: deviceName
        });
        resolve();
      }).catch((err) => {
        dispatch({
          type: CAST_CONFIGURE_FAIL,
          payload: err
        });
        reject(err);
      });
    });
  };
};
