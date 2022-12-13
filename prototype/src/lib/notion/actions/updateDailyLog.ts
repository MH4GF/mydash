import type { RecordInput } from "@app/integrations/interfaces";
import type { Client } from "@notionhq/client";
import { getNameProperty } from "../logic/getNameProperty";
import { getRelationOfIntegrationRecordsProperties } from "../logic/getRelationOfIntegrationRecordsProperties";
import { mapTypeAndIdFromIntegrationRecords } from "../logic/mapTypeAndIdFromIntegrationRecords";
import type { PageObject } from "../type";
import { createIntegrationRecord } from "./createIntegrationRecord";

type Args = {
  client: Client;
  dailyLogPage: PageObject;
  inputs: RecordInput[];
};
export const updateDailyLog = async ({
  client,
  dailyLogPage,
  inputs,
}: Args) => {
  const integrationRecordPages = await Promise.all(
    inputs.map((input) =>
      createIntegrationRecord({ dailyLogPage, input, client })
    )
  );
  const records = mapTypeAndIdFromIntegrationRecords(integrationRecordPages);
  const relationProperties = getRelationOfIntegrationRecordsProperties(records);
  const nameProperty = getNameProperty(new Date());
  const properties = {
    ...relationProperties,
    ...nameProperty,
  };

  await client.pages.update({
    page_id: dailyLogPage.id,
    properties,
  });
};
