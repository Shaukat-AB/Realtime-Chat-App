import { apiPath } from '.';

export const getContacts = async () => {
  const res = await fetch(apiPath.API_CONTACTS, {
    method: 'GET',
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error getContacts');

  return parsed;
};

export const getCurrentMessages = async (contactId) => {
  const res = await fetch(apiPath.API_MESSAGES_BY_ID + contactId, {
    method: 'GET',
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error getCurrentMessages');

  return parsed;
};

export const postSendMessage = async (message, contactId) => {
  const res = await fetch(apiPath.API_SEND_MESSAGE_BY_ID + contactId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error sendMessage');

  return parsed;
};

export const deleteMessages = async (messageIds = []) => {
  const res = await fetch(apiPath.API_DELETE_MESSAGES, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messageIds }),
    credentials: 'include',
  });

  const parsed = await res.json();

  if (!res.ok && !parsed?.message) throw new Error('Error Message delete');

  return parsed;
};

export const softDeleteMessages = async (messageIds = []) => {
  const res = await fetch(apiPath.API_DELETE_MESSAGES, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messageIds }),
    credentials: 'include',
  });

  const parsed = await res.json();
  if (!res.ok && !parsed?.message) throw new Error('Error Message delete');

  return parsed;
};
