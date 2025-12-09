import { formatDate } from './date';

export const lastSeenText = (user) => {
  const date = formatDate(user?.lastSeen);
  return date ? 'Last seen ' + date : null;
};
