export const CAST_CONFIGURE_SUCCESS = "CAST_CONFIGURE_SUCCESS";
export const CAST_CONFIGURE_FAIL = "CAST_CONFIGURE_FAIL";

export const configureCast = (session) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const deviceName = session.session.receiver.friendlyName;

      session.send('deviceName', { deviceName }, (err, data) => {
        if (err) {
          dispatch({
            type: CAST_CONFIGURE_FAIL,
            payload: err
          });
          reject(err);
        }

        dispatch({
          type: CAST_CONFIGURE_SUCCESS,
          payload: deviceName
        });
        resolve();

      });
    });
  };
};
