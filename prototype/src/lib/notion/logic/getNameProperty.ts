import { format } from "@app/lib/dateFns";

export const getNameProperty = (date: Date) => ({
  title: [
    {
      text: {
        content: format(date, "yyyy/MM/dd"),
      },
    },
  ],
});
