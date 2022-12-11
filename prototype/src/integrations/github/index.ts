import type { Integration } from "../interfaces";
import { collectIssues } from "./issues";

export const githubIntegration = (): Integration => {
  const collect = async () => {
    const issues = await collectIssues({ type: "GitHub" });
    return [...issues];
  };

  return { collect };
};
