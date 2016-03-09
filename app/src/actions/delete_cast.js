export const DELETE_CASTS_SUCCESSFUL = "DELETE_CASTS_SUCCESSFUL";
export const DELETE_CASTS_FAILURE = "DELETE_CASTS_FAILURE";

import { DELETE, apiExecutor } from '../support';

export const deleteCast = (castId) => {
  return apiExecutor({
    verb: DELETE,
    url: `casts/${castId}`,

    successType: DELETE_CASTS_SUCCESSFUL,
    failureType: DELETE_CASTS_FAILURE
  });
};
