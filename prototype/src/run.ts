import { collectIntegrationRecordInputs } from "./integrations";
import { createIntegrationRecord, findDailyLog } from "./lib/notion";

export const run = async () => {
  const dailyLogPage = await findDailyLog();
  const inputs = await collectIntegrationRecordInputs();
  await Promise.all(
    inputs.map((input) => createIntegrationRecord({ dailyLogPage, input }))
  );
};
