import { collectIntegrationRecordInputs } from "./integrations";
import {
  client as notionClient,
  findDailyLog,
  updateDailyLog,
} from "./lib/notion";

export const run = async () => {
  const client = notionClient();
  const dailyLogPage = await findDailyLog({ client });
  const inputs = await collectIntegrationRecordInputs();
  await updateDailyLog({ dailyLogPage, inputs, client });
};
