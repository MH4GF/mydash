import type { RecordInput } from "@app/integrations/interfaces";
import { isEqual, parseISO, startOfDay } from "@app/lib/dateFns";
import { integrationType } from "../constants";
import { fetchPullRequests } from "./fetchPullRequests";

export const collectPullRequests = async (): Promise<RecordInput[]> => {
  const pullRequests = await fetchPullRequests();
  const filteredPullRequests = pullRequests.filter(({ updatedAt }) => {
    const updatedAtDate = startOfDay(parseISO(updatedAt));
    const today = startOfDay(new Date());
    return isEqual(updatedAtDate, today);
  });
  console.dir({ filteredPullRequests }, { depth: null });
  return filteredPullRequests.map(({ title, url }) => ({
    name: title,
    url,
    type: integrationType,
  }));
};
