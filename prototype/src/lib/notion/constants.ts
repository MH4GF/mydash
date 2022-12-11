export const integrationsDatabaseColumns = {
  Name: { name: "Name", type: "title" },
  Integration: { name: "Integration", type: "select" },
  Url: { name: "Url", type: "url" },
} as const;

export type IntegrationsDatabaseColumns =
  keyof typeof integrationsDatabaseColumns;
