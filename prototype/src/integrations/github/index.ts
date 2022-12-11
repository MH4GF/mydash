import type { Integration } from "../interfaces";
import { collectIssues } from "./issues";
import { collectPullRequests } from "./pullRequests";

export const githubIntegration = (): Integration => {
  const collect = async () => {
    return Promise.all([collectIssues(), collectPullRequests()]).then(
      (inputs) => inputs.flat()
    );
  };

  return { collect };
};
