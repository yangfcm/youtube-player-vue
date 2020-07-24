/**
 * Convert a date object to human-readable string
 */
export default (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(dateObj);
  const year = dateObj.getFullYear();
  return `${day} ${month}, ${year}`;
};
