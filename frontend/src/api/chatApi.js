import { apiClient, apiPath } from '.';

export const getContacts = async () => {
  return await apiClient.get(apiPath.API_CONTACTS);
};

export const getCurrentMessages = async (contactId) => {
  return await apiClient.get(apiPath.API_MESSAGES_BY_ID + contactId);
};

export const postSendMessage = async (message, contactId) => {
  return await apiClient.post(
    apiPath.API_SEND_MESSAGE_BY_ID + contactId,
    message
  );
};

export const deleteMessages = async (messageIds = []) => {
  return await apiClient.delete(apiPath.API_DELETE_MESSAGES, { messageIds });
};

export const softDeleteMessages = async (messageIds = []) => {
  return await apiClient.patch(apiPath.API_DELETE_MESSAGES, { messageIds });
};
