export const UPDATE_SLIDE_SUCCESS = "UPDATE_SLIDE_SUCCESS";
export const UPDATE_SLIDE_FAILURE = "UPDATE_SLIDE_FAILURE";

import { POST_FILE, apiExecutor } from '../support';

export const updateSlide = (slide) => {
  // build form data so we can post like a form
  const data = new FormData();
  for (let prop in slide) {
    let val = slide[prop];
    if (val) {
      data.append(prop, val);
    }
  }

  // post
  return apiExecutor({
    verb: POST_FILE,
    url: 'slides',
    data: data,

    successType: UPDATE_SLIDE_SUCCESS,
    failureType: UPDATE_SLIDE_FAILURE
  });
};
