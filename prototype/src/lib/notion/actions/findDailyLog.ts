import { formatDate } from "@app/lib/dateFns";
import { client } from "../client";

export const findDailyLog = async () => {
  const notion = client();
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DAILY_LOG_DATABASE_ID,
    filter: {
      and: [
        {
          property: "Date",
          type: "date",
          date: {
            equals: formatDate(new Date()),
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
