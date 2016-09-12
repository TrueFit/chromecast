import { GET, apiExecutor } from 'support';

export const LOAD_CASTS_SUCCESSFUL = 'LOAD_CASTS_SUCCESSFUL';
export const LOAD_CASTS_FAILURE = 'LOAD_CASTS_FAILURE';

export const loadCasts = () =>
  apiExecutor({
    verb: GET,
    url: 'castlist',

    successType: LOAD_CASTS_SUCCESSFUL,
    failureType: LOAD_CASTS_FAILURE,
  });
