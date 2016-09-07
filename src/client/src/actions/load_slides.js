import { GET, apiExecutor } from 'support';

export const LOAD_SLIDES_SUCCESS = 'LOAD_SLIDES_SUCCESS';
export const LOAD_SLIDES_FAIL = 'LOAD_SLIDES_FAIL';

export const loadSlides = () =>
  apiExecutor({
    verb: GET,
    url: 'slide',

    successType: LOAD_SLIDES_SUCCESS,
    failureType: LOAD_SLIDES_FAIL,
  });
