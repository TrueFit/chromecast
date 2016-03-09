export const LOAD_SLIDES_SUCCESSFUL = "LOAD_SLIDES_SUCCESSFUL";
export const LOAD_SLIDES_FAILURE = "LOAD_SLIDES_FAILURE";

import { GET, apiExecutor } from '../support';

export const loadSlides = () => {
  return apiExecutor({
    verb: GET,
    url: 'slides',

    successType: LOAD_SLIDES_SUCCESSFUL,
    failureType: LOAD_SLIDES_FAILURE
  });
};
