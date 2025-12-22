export function getApiErrorMessage(error, fallbackMessage) {
  if (!error) return fallbackMessage;

  const message =
    error?.body?.message ||
    error?.response?.body?.message ||
    error?.error?.message ||
    error?.message;

  if (message && typeof message === 'string') {
    return message;
  }

  return fallbackMessage;
}
