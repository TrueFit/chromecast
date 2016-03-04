export const UPDATE_CAST_SUCCESSFUL = "UPDATE_CAST_SUCCESSFUL";
export const UPDATE_CAST_FAILURE = "UPDATE_CAST_FAILURE";

import { POST, apiExecutor } from '../sugar';

export const updateCast = (cast) => {
  return apiExecutor({
    verb: POST,
    url: 'casts',
    data: cast,

    successType: UPDATE_CAST_SUCCESSFUL,
    failureType: UPDATE_CAST_FAILURE
  });
};
