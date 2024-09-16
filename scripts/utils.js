export function getCurrentFormattedDateTime() {
  return new Date().toLocaleDateString(
    "ru-RU",
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: "2-digit",
      minute: "2-digit"
    }
  );
}
