import format from "date-fns/format";

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
