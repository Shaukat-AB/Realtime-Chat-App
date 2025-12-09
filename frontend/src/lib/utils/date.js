export const formatDateToLocalTimeIn2Digit = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = (date) => {
  if (!date) return null;

  const now = new Date();
  const last = new Date(date);

  const sameDate =
    now.getDate() === last.getDate() &&
    now.getMonth() === last.getMonth() &&
    now.getFullYear() === last.getFullYear();

  return sameDate
    ? formatDateToLocalTimeIn2Digit(last)
    : last.toLocaleDateString();
};
