export const integrationsDatabaseColumns = {
  Name: { type: "title" },
  Integration: { type: "select" },
  Url: { type: "url" },
} as const;

export type IntegrationsDatabaseColumns = keyof typeof integrationsDatabaseColumns;