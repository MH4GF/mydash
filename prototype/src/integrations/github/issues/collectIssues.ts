import type { RecordInput } from "@app/integrations/interfaces";
import { integrationType } from "../constants";
import { fetchIssues } from "./fetchIssues";

export const collectIssues = async (): Promise<RecordInput[]> => {
  const issues = await fetchIssues();
  return issues.map(({ title, url }) => ({
    name: title,
    url,
    type: integrationType,
  }));
};
