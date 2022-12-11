import format from "date-fns/format";

export { startOfDay, formatISO, parseISO, isEqual, subSeconds } from "date-fns";

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
