import type { RecordInput } from "@app/integrations/interfaces";
import type {
  CreatePageParameters,
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { client } from "../client";
import type { IntegrationsDatabaseColumns } from "../constants";

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

  const properties: Record<IntegrationsDatabaseColumns, PropertyValue> = {
    Name: titleProperty({ content: input.name, url: input.url }),
    Integration: selectProperty({ name: type }),
    Url: {
      url: input.url,
    },
  };

  const integrationPage = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_INTEGRATIONS_DATABASE_ID,
    },
    // @ts-expect-error notion.jsの型が辛すぎる
    properties,
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
