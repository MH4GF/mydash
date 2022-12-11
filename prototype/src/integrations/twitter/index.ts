import type { Integration } from "../interfaces";
import { collectTweets } from "./tweets";

export const twitterIntegration = (): Integration => {
  const collect = async () => {
    return Promise.all([collectTweets()]).then((inputs) => inputs.flat());
  };

  return { collect };
};
