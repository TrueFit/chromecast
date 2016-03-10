import Http from '../support/http';

export const loadEmptyMessages = () => {
  return new Http().get('messages/empty');
};

export const deleteMessage = (message_id) => {
  return new Http().delete(`messages/${message_id}`);
};
