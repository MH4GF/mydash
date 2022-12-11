import type {
  IntegrationType,
  RecordInput,
} from "@app/integrations/interfaces";
import { fetchIssues } from "./fetchIssues";

type Args = {
  type: IntegrationType;
};

export const collectIssues = async ({ type }: Args): Promise<RecordInput[]> => {
  const issues = await fetchIssues();
  return issues.map(({ title, url }) => ({
    name: title,
    url,
    type,
  }));
};
