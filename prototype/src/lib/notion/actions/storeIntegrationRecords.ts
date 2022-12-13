import type { RecordInput } from "@app/integrations/interfaces";
import type { Client } from "@notionhq/client";
import type { PageObject } from "../type";
import { createIntegrationRecord } from "./createIntegrationRecord";
import { updateRelationOfIntegrationRecords } from "./updateRelationOfIntegrationRecords";

type Args = {
  client: Client;
  dailyLogPage: PageObject;
  inputs: RecordInput[];
};
export const storeIntegrationRecords = async ({
  client,
  dailyLogPage,
  inputs,
}: Args) => {
  const integrationRecordPages = await Promise.all(
    inputs.map((input) =>
      createIntegrationRecord({ dailyLogPage, input, client })
    )
  );
  await updateRelationOfIntegrationRecords({
    client,
    dailyLogPage,
    integrationRecordPages,
  });
};
