export const LOAD_CASTS_SUCCESSFUL = "LOAD_CASTS_SUCCESSFUL";
export const LOAD_CASTS_FAILURE = "LOAD_CASTS_FAILURE";

import { GET, apiExecutor } from '../sugar';

export const loadCasts = () => {
  return apiExecutor({
    verb: GET,
    url: 'casts',

    successType: LOAD_CASTS_SUCCESSFUL,
    failureType: LOAD_CASTS_FAILURE
  });
};
