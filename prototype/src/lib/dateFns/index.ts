import format from "date-fns/format";

export { startOfDay, formatISO } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
