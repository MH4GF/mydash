import { collectIntegrationRecordInputs } from "./integrations";
import {
  client as notionClient,
  findDailyLog,
  storeIntegrationRecords,
} from "./lib/notion";

export const run = async () => {
  const client = notionClient();
  const dailyLogPage = await findDailyLog({ client });
  const inputs = await collectIntegrationRecordInputs();
  await storeIntegrationRecords({ dailyLogPage, inputs, client });
};
