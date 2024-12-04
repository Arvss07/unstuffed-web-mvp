export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "2-digit" };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
