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
