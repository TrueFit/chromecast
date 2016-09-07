import { browserHistory } from 'react-router';
import constants from 'constants';

export const apiUrl = (relativeUrl) => `${constants.API_URL}/${relativeUrl}`;

export const goto = (relativeUrl) => {
  browserHistory.push(relativeUrl);
};
