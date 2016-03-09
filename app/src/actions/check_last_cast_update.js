import Http from '../support/http';

export const checkLastCastUpdate = (cast_id) => {
  return new Http().get(`casts/${cast_id}`);
};
