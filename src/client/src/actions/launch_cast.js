import { GET, apiExecutor } from 'support';

export const LAUNCH_CAST_SUCCESSFUL = 'LAUNCH_CAST_SUCCESSFUL';
export const LAUNCH_CAST_FAILURE = 'LAUNCH_CAST_FAILURE';

export const launchCast = (cast) =>
  apiExecutor({
    verb: GET,
    url: `castcontrol/${cast.name}`,

    successType: LAUNCH_CAST_SUCCESSFUL,
    failureType: LAUNCH_CAST_FAILURE,
  });
