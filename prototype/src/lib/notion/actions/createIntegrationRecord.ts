import type { RecordInput } from "@app/integrations/interfaces";
import type { Client } from "@notionhq/client";
import type {
  CreatePageParameters,
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { client } from "../client";
import type { IntegrationsDatabaseColumns } from "../constants";
import { findIntegrationRecord } from "./findIntegrationRecord";

type ValueOf<T> = T[keyof T];
type PropertyValue = ValueOf<CreatePageParameters["properties"]>;

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

const findOrCreateIntegrationRecord = async ({
  notion,
  input: { name, url, type },
}: {
  notion: Client;
  input: RecordInput;
}) => {
  const record = await findIntegrationRecord({ url });
  if (record) return record;

  const properties: Record<IntegrationsDatabaseColumns, PropertyValue> = {
    Name: titleProperty({ content: name, url }),
    Integration: selectProperty({ name: type }),
    Url: {
      url,
    },
  };

  return await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_INTEGRATIONS_DATABASE_ID,
    },
    // @ts-expect-error notion.jsの型が辛すぎる
    properties,
  });
};

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

  const dailyLogPageProperties = dailyLogPage.properties[type];
  if (dailyLogPageProperties?.type !== "relation") {
    throw new Error(`Invalid type: ${dailyLogPageProperties?.type || ""}`);
  }

  const notion = client();

  const integrationPage = await findOrCreateIntegrationRecord({
    notion,
    input,
  });

  await notion.pages.update({
    page_id: dailyLogPage.id,
    properties: {
      [type]: {
        relation: [
          ...dailyLogPageProperties.relation,
          {
            id: integrationPage.id,
          },
        ],
      },
    },
  });
};
