export const DELETE_SLIDE_SUCCESSFUL = "DELETE_SLIDE_SUCCESSFUL";
export const DELETE_SLIDE_FAILURE = "DELETE_SLIDE_FAILURE";

import { DELETE, apiExecutor } from '../sugar';

export const deleteSlide = (slideId) => {
  return apiExecutor({
    verb: DELETE,
    url: `slides/${slideId}`,

    successType: DELETE_SLIDE_SUCCESSFUL,
    failureType: DELETE_SLIDE_FAILURE
  });
};
