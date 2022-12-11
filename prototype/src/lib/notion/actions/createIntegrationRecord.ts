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

type IntegrationParameters = {
  name: TitleParameters;
  integration: SelectParameters;
};

type Args = {
  dailyLogPage: PageObjectResponse | PartialPageObjectResponse;
  params: IntegrationParameters;
};

export const createIntegrationRecord = async ({
  dailyLogPage,
  params,
}: Args) => {
  const { name, integration } = params;

  if (!("properties" in dailyLogPage)) {
    throw new Error("Invalid page");
  }

  const properties = dailyLogPage.properties[integration.name];
  if (properties?.type !== "relation") {
    throw new Error(`Invalid type: ${properties?.type || ""}`);
  }

  const notion = client();

  const integrationPage = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_INTEGRATIONS_DATABASE_ID,
    },
    properties: {
      Name: titleProperty(name),
      Integration: selectProperty(integration),
    },
  });

  await notion.pages.update({
    page_id: dailyLogPage.id,
    properties: {
      [integration.name]: {
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
