import urljoin from 'url-join';
import { browserHistory } from 'react-router';

import constants from 'constants';

export const apiUrl = (relativeUrl) => urljoin(constants.API_URL, relativeUrl);

export const goto = (relativeUrl) => {
  browserHistory.push(relativeUrl);
};
