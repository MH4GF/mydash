import type { Client } from "@notionhq/client";
import { integrationsDatabaseColumns } from "../constants";
import { getRelationOfIntegrationRecordsProperties } from "../logic/getRelationOfIntegrationRecordsProperties";
import type { PageObject } from "../type";

type Args = {
  client: Client;
  dailyLogPage: PageObject;
  integrationRecordPages: PageObject[];
};

export const updateRelationOfIntegrationRecords = async ({
  client,
  dailyLogPage,
  integrationRecordPages,
}: Args) => {
  const records = integrationRecordPages.map((page) => {
    if (!("properties" in page))
      throw new Error("Invalid page: properties is not found");
    const column =
      page.properties[integrationsDatabaseColumns.Integration.name];
    if (!column)
      throw new Error("Invalid page: Integration property is not found");
    if (column.type !== "select")
      throw new Error(`Invalid type: ${column.type} is not select`);
    if (!column.select) throw new Error("Invalid column: column is empty");

    const type = column.select.name;
    return {
      [type]: page.id,
    };
  });

  const properties = getRelationOfIntegrationRecordsProperties(records);

  await client.pages.update({
    page_id: dailyLogPage.id,
    properties,
  });
};
