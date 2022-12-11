import { client } from "../client";
import { integrationsDatabaseColumns } from "../constants";

type Args = {
  url: string;
};

export const findIntegrationRecord = async ({ url }: Args) => {
  const notion = client();
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_INTEGRATIONS_DATABASE_ID,
    filter: {
      and: [
        {
          property: integrationsDatabaseColumns.Url.name,
          type: integrationsDatabaseColumns.Url.type,
          url: {
            equals: url,
          },
        },
      ],
    },
  });

  if (results.length === 0 || results.length > 1) {
    return null;
  }

  return results[0]!;
};
