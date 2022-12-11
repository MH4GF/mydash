import { createIntegrationRecord, findDailyLog } from "./lib/notion";

export const run = async () => {
  const dailyLogPage = await findDailyLog();
  await createIntegrationRecord({
    dailyLogPage,
    params: {
      name: {
        content: "test",
        url: "https://google.com",
      },
      integration: {
        name: "Tweet",
      },
    },
  });
};
