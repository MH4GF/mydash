declare namespace NodeJS {
  interface ProcessEnv {
    readonly NOTION_TOKEN: string;
    readonly NOTION_DAILY_LOG_DATABASE_ID: string;
    readonly NOTION_INTEGRATIONS_DATABASE_ID: string;
  }
}
