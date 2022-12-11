import { formatISO, startOfDay, endOfDay } from "@app/lib/dateFns";
import { client } from "../client";

export const findDailyLog = async () => {
  const notion = client();
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DAILY_LOG_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Date",
          type: "created_time",
          created_time: {
            on_or_after: formatISO(startOfDay(new Date())),
          },
        },
        {
          property: "Date",
          type: "created_time",
          created_time: {
            on_or_before: formatISO(endOfDay(new Date())),
          },
        },
      ],
    },
  });

  if (results.length !== 1) {
    throw new Error("日報が1件ではありません");
  }

  return results[0]!;
};
