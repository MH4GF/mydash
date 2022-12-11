import type { RecordInput } from "@app/integrations/interfaces";
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { client } from "../client";

type TitleParameters = {
  content: string;
  url: string;
};

const titleProperty = ({
  content,
  url,
}: TitleParameters): {
  title: { text: { content: string; link: { url: string } }; type: "text" }[];
  type: "title";
} => ({
  title: [
    {
      text: {
        content,
        link: {
          url,
        },
      },
      type: "text",
    },
  ],
  type: "title",
});

type SelectParameters = {
  name: string;
};

const selectProperty = ({ name }: SelectParameters) => ({
  select: {
    name,
  },
});

type Args = {
  dailyLogPage: PageObjectResponse | PartialPageObjectResponse;
  input: RecordInput;
};

export const createIntegrationRecord = async ({
  dailyLogPage,
  input,
}: Args) => {
  const { type } = input;

  if (!("properties" in dailyLogPage)) {
    throw new Error("Invalid page");
  }

  const properties = dailyLogPage.properties[type];
  if (properties?.type !== "relation") {
    throw new Error(`Invalid type: ${properties?.type || ""}`);
  }

  const notion = client();

  const integrationPage = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_INTEGRATIONS_DATABASE_ID,
    },
    properties: {
      Name: titleProperty({ content: input.name, url: input.url }),
      Integration: selectProperty({ name: type }),
    },
  });

  await notion.pages.update({
    page_id: dailyLogPage.id,
    properties: {
      [type]: {
        relation: [
          ...properties.relation,
          {
            id: integrationPage.id,
          },
        ],
      },
    },
  });
};
