import { GET, apiExecutor } from 'support';

export const LOAD_CHROMECASTS_SUCCESS = 'LOAD_CHROMECASTS_SUCCESS';
export const LOAD_CHROMECASTS_FAIL = 'LOAD_CHROMECASTS_FAIL';

export const loadChromecasts = () =>
  apiExecutor({
    verb: GET,
    url: 'chromecast',

    successType: LOAD_CHROMECASTS_SUCCESS,
    failureType: LOAD_CHROMECASTS_FAIL,
  });
